json.extract! expense, :id, :price, :reason, :details, :date, :created_at, :updated_at
json.url expense_url(expense, format: :json)