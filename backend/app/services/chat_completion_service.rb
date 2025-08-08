# rubocop:disable Layout/TrailingWhitespace
require 'net/http'
require 'json'
require 'uri'

class ChatCompletionService # rubocop:disable Style/Documentation
  API_URL = 'https://openrouter.ai/api/v1/chat/completions'.freeze
  MODEL_NAME = 'openai/gpt-oss-20b:free'.freeze

  def initialize(user:)
    @user = user
    @full_text = ''
  end

  def stream_to(stream)
    unless @user.can_use_ai_api?
      Rails.logger.warn "[ChatCompletionService] Utente ha esaurito il limite di chiamate API AI."
      stream.write("data: #{{ type: 'TEXT', message: 'Hai raggiunto il limite mensile di chiamate AI.' }.to_json}\n\n")
      stream.close
      return
    end

    prompt = format_holdings_for_prompt
    uri = URI(API_URL)
    
    request = Net::HTTP::Post.new(uri)
    request['Content-Type'] = 'application/json'
    request['Authorization'] = "Bearer #{ENV.fetch('OPENROUTER_API_KEY')}"

    request.body = {
      model: MODEL_NAME,
      temperature: 0.7,
      stream: true,
      messages: [
        { role: 'user', content: prompt }
      ]
    }.to_json

    Net::HTTP.start(uri.host, uri.port, use_ssl: true) do |http|
      http.request(request) do |response|
        # --- ERROR FROM OPENROUTER ---
        unless response.is_a?(Net::HTTPOK)
          error_body = response.body 
          Rails.logger.error "[ChatCompletionService] ERRORE DALL'API: #{response.code} #{response.message} #{error_body}"
          stream.write("data: #{{ type: 'ERROR', 
                                  message: "API Error: #{response.code} - Controlla i log del server." }.to_json}\n\n")
          return 
        end
        
        response.read_body do |chunk|
          chunk.lines.each do |line|
            next unless line.start_with?('data: ')

            content = line.delete_prefix('data: ')

            if content == '[DONE]'
              Rails.logger.info '[ChatCompletionService] Streaming completato. Invio del messaggio finale con testo completo.'
              stream.write("data: #{{ type: 'COMPLETE', message: 'testo temporaneo a scopo di debug' }.to_json}\n\n")
              break 
            end

            # when normal chuks arrives
            begin
              Rails.logger.info "[DEBUG SSE] Chunk completo: #{content}"
              parsed = JSON.parse(content)
              text = parsed.dig('choices', 0, 'delta', 'content')
              next if text.nil?

              @full_text << text
              stream.write("data: #{{ type: 'TEXT', message: text }.to_json}\n\n")
            rescue JSON::ParserError => e
              Rails.logger.warn "[ChatCompletionService] JSON non valido: #{e.message} - content: '#{content}'"
              next
            end
          end
        end
      end
    end
    @user.increment_ai_api_usage!

  rescue StandardError => e
    Rails.logger.error "[ChatCompletionService] Errore durante la richiesta: #{e.message}"
    stream.write("data: Errore: #{e.message}\n\n")
  ensure
    Rails.logger.info '[ChatCompletionService] Streaming completato. Chiusura stream.'
    stream.close
  end

  def format_holdings_for_prompt
    holdings = @user.holdings.includes(:user)
    Rails.logger.info "[ChatCompletionService] Holdings trovati: #{holdings.count}"

    prices_by_label = Price.where(label: holdings.map(&:label)).index_by(&:label)
    Rails.logger.info "[ChatCompletionService] Prezzi trovati: #{prices_by_label.keys.join(', ')}"

    formatted = holdings.map do |h|
      price = prices_by_label[h.label]&.price || 0
      value = h.quantity.to_f * price.to_f
      "#{h.label} (#{h.category}): #{h.quantity} x #{price} = #{value.round(2)} EUR"
    end

    total = formatted.sum { |line| line[/= ([\d\.]+)/, 1].to_f }
    Rails.logger.info "[ChatCompletionService] Valore totale stimato: #{total.round(2)} EUR"

    <<~TEXT
      The user exclusively holds cryptocurrencies — exclude stocks, ETFs, or real estate. This is their portfolio:  
      #{formatted.join("\n")}

      Estimated total value: #{total.round(2)} EUR.

      # Objective

      Evaluate the portfolio based on the following criteria:

      1. Memecoins and low-caps  
      2. High-cap cryptocurrencies  
      3. Diversification across ecosystems  
      4. Asset liquidity  

      Then, provide the following:

      1. A brief opinion on the portfolio (max 3 sentences)  
      2. A score from 1 to 10, where 10 represents an excellent, well-balanced crypto portfolio  
      3. A **fun and descriptive portfolio name** (e.g., "The Cautious Strategist", "The Wild Gambler") that reflects its style  
      4. 2-3 concise improvement suggestions

      **Output format:**

      ### 🧠 Opinion  
      [short paragraph]  

      ### 🏆 Score  
      **[X] / 10**

      ### 🏷️ Portfolio Name  
      **"[descriptive nickname]"**

      ### 📈 Suggestions  
        - [suggestion 1]  
        - [suggestion 2]  
        - [suggestion 3]

      Do **not** justify or explain the reasoning behind the score or suggestions.  
      Do **not** repeat the portfolio contents.  
      Keep the tone professional but engaging.
    TEXT
  end
end
