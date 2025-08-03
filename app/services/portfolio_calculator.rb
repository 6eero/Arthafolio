# PortfolioCalculator is a service class responsible for calculating portfolio-related
# data for a user. It operates on a collection of asset holdings and provides:
#
# - A list of assets with detailed metrics such as value, category, and percentage share.
# - Historical portfolio values based on user snapshots (limited to the most recent 20).
# - Totals for crypto, ETF, and combined asset values.
#
# This class is read-only and is designed to support portfolio summaries, analytics,
# or dashboards without persisting any state.
#
# Example usage:
#   calculator = PortfolioCalculator.new(user.holdings, user)
#   calculator.assets    # => [<Asset label: "BTC", value: 1000.0, ...>, ...]
#   calculator.history   # => [{ total_value: 1234.56, taken_at: <Time> }, ...]
#   calculator.totals    # => { crypto: 1000.0, etf: 500.0, total: 1500.0 }
#
# Note:
# - Asset prices are fetched from the most recent available data (Price model).
# - Percentages are relative to the total portfolio value.
class PortfolioCalculator
  Asset = Struct.new(:label, :quantity, :price, :value, :category, :percentage, keyword_init: true)

  def initialize(holdings, user, timeframe, currency)
    @holdings = holdings
    @user = user
    @timeframe = timeframe
    @currency = currency
    @conversion_rate = currency == 'eur' ? 1.0 : ConversionFetcher.fetch(currency)
  end

  def assets
    @assets ||= build_assets
  end

  def history
    limit = timeframe_limit(@timeframe)
    step = sampling_step(@timeframe)

    snapshots = @user.portfolio_snapshots
                     .order(taken_at: :desc)
                     .limit(limit)
                     .reverse

    sampled_snapshots = snapshots.each_with_index.select do |_snapshot, index|
      index % step == 0
    end.map(&:first)

    sampled_snapshots.map do |snapshot|
      {
        total_value: (snapshot.total_value.to_f * @conversion_rate).round(2),
        taken_at: snapshot.taken_at
      }
    end
  end

  def totals
    current_total = crypto_total.to_f * @conversion_rate

    Rails.logger.info "🟣 PortfolioCalculator: #{crypto_total.to_f} * #{@conversion_rate} = #{current_total}"

    periods = {
      day: Date.yesterday,
      week: 1.week.ago.to_date,
      month: 1.month.ago.to_date
    }

    profit_loss = periods.transform_values do |date|
      previous_total = total_value_on(date).to_f * @conversion_rate
      value = (current_total - previous_total).round(2)
      percent = previous_total.positive? ? ((value / previous_total) * 100).round(2) : 0
      { value: value, percent: percent }
    end

    {
      total: current_total.round(2),
      profit_loss: profit_loss
    }
  end

  private

  def build_assets
    return [] if crypto_total.zero?

    @holdings.map do |h|
      quantity = h.quantity.to_f
      price = (latest_price_for(h.label).to_f * @conversion_rate).round(2)
      value = (quantity * price).to_f.round(2)
      percentage = crypto_total.positive? ? (100.0 * value / (crypto_total * @conversion_rate)).round(2) : 0

      Asset.new(
        label: h.label,
        quantity: quantity.round(5),
        price: price.round(5),
        value: value,
        category: h.category,
        percentage: percentage
      )
    end.sort_by { |a| -a.percentage }
  end

  def latest_price_for(label)
    @latest_prices ||= Price.where(label: @holdings.map(&:label).uniq)
                            .order(retrieved_at: :desc)
                            .group_by(&:label)
                            .transform_values(&:first)
    @latest_prices[label]&.price || 0
  end

  def crypto_total
    @crypto_total ||= calculate_total_for_category('crypto')
  end

  def calculate_total_for_category(category)
    @holdings
      .select { |h| h.category == category }
      .sum { |h| h.quantity.to_f * latest_price_for(h.label) }
  end

  def total_value_on(date)
    day_start = date.beginning_of_day
    day_end = date.end_of_day

    snapshot = @user.portfolio_snapshots
                    .where(taken_at: day_start...day_end)
                    .order(taken_at: :desc)
                    .first

    snapshot&.total_value.to_f.round(2) || 0
  end

  def timeframe_limit(tf)
    case tf&.downcase
    when '24h'
      24
    when '7d'
      24 * 7
    when '1m'
      24 * 30
    when '3m'
      24 * 90
    when '1y'
      24 * 365
    else
      24 * 7
    end
  end

  def sampling_step(tf)
    case tf&.downcase
    when '24h'
      1   # ogni ora → 24 punti
    when '7d'
      2   # ogni 2 ore → ~84 punti (168/2)
    when '1m'
      4   # ogni 4 ore → ~180 punti (720/4)
    when '3m'
      11  # ogni 11 ore → ~196 punti (2160/11)
    when '1y'
      44  # ogni 44 ore (~2 giorni) → ~198 punti (8760/44)
    else
      2   # default
    end
  end
end
