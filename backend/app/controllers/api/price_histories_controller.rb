module Api
  class PriceHistoriesController < ApplicationController
    before_action :authenticate_request

    def index
      label = params[:label]
      range = (params[:range] || 30).to_i # giorni, default 30

      data = CryptoPriceHistory
               .where(label: label)
               .where('retrieved_at >= ?', range.days.ago)
               .order(:retrieved_at)
               .pluck(:retrieved_at, :price)

      render json: {
        label: label,
        history: data.map { |t, p| { time: t, price: p.to_f } }
      }
    end
  end
end
