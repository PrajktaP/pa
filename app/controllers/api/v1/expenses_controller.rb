class Api::V1::ExpensesController < Api::V1::BaseController

    
  def index
    if !params[:query].blank?
      expenses = current_user.expenses.unarchived.searched_by_keyword(params[:query]).order("created_at desc")
    else
      expenses = current_user.expenses.unarchived.order("created_at desc")
    end
    if params[:previous]
      expenses = expenses.between(Time.now-params[:previous].to_i.months)
    else
      expenses = expenses.between(Time.now)
    end
    puts "expenses are  =========> #{expenses.inspect}"
    render json: {expenses: expenses}
  end
  
  def create
    expense = Expense.create(expense_params)
    render json: current_user.expenses.order("created_at desc")
  end 
  
  def destroy
    e = Expense.find(params[:id])
    e.update_attributes({:deleted => true})
    respond_with e
  end

  # def update
#     ticket = Ticket.find(params["id"])
#     ticket.update_attributes(ticket_params)
#     respond_with ticket, json: ticket
#   end
  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_expense
      @expense = Expense.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def expense_params
      params.require(:expense).permit(:price, :reason, :details, :date, :user_id, :deleted)
    end
end
