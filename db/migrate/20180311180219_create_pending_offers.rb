class CreatePendingOffers < ActiveRecord::Migration[5.1]
  def change
    create_table :pending_offers do |t|
      t.references :offer, foreign_key: true
      t.references :buyer, foreign_key: true, references: :users

      t.timestamps
    end
  end
end
