class CreateExpenses < ActiveRecord::Migration[5.0]
  def change
    create_table :expenses do |t|
      t.float :price
      t.string :reason
      t.text :details
      t.date :date

      t.timestamps
    end
  end
end
