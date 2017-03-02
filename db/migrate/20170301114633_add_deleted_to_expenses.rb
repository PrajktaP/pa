class AddDeletedToExpenses < ActiveRecord::Migration[5.0]
  def change
    add_column :expenses, :deleted, :boolean, default: 0
  end
end
