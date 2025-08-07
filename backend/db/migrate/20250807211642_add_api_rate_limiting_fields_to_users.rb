class AddApiRateLimitingFieldsToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :monthly_ai_api_call_limit, :integer, default: 30, null: false
    add_column :users, :ai_api_calls_used_this_month, :integer, default: 0, null: false
    add_column :users, :ai_api_calls_reset_at, :datetime
  end
end
