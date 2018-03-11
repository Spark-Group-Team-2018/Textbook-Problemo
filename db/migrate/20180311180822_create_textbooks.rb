class CreateTextbooks < ActiveRecord::Migration[5.1]
  def change
    create_table :textbooks do |t|
      t.references :book, foreign_key: true
      t.references :user, foreign_key: true
      t.string :status
      t.string :owner_description
      t.boolean :is_public

      t.timestamps
    end
  end
end
