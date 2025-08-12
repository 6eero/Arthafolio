class CreateCryptoPriceHistories < ActiveRecord::Migration[8.0]
  def change
    create_table :crypto_price_histories do |t|
      t.string :label, null: false
      t.decimal :price, precision: 15, scale: 8, null: false
      t.datetime :retrieved_at, null: false
      t.timestamps
    end

    add_index :crypto_price_histories, :label
    add_index :crypto_price_histories, [:label, :retrieved_at]
  end
end
