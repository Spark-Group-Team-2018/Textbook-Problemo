class CreateBooks < ActiveRecord::Migration[5.1]
  def change
    create_table :books do |t|
      t.integer :ISBN
      t.string :title
      t.string :description
      t.references :manufacturer, foreign_key: true

      t.timestamps
    end
  end
end
