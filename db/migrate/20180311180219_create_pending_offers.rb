class CreatePendingOffers < ActiveRecord::Migration[5.1]
  def change
    create_table :pending_offers do |t|
      t.references :offer, foreign_key: true
      t.integer :buyer_id

      t.timestamps
    end

    add_index :users, :buyer_id
  end
end
