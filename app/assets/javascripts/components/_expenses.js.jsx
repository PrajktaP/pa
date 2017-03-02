var Expenses = React.createClass({
	
    handlePreviousClick: function(e) {
	  e.preventDefault();
      var self = this;
      $.ajax({
        url: '/api/v1/expenses',
        data: { previous: 1 },
        success: function(data) {
          self.props.handlePreviousClick(data, 1);
        },
        error: function(xhr, status, error) {
          alert('error: ', status, xhr, error);
        }
      });
    },
	
    handleCurrentClick: function(e) {
	  e.preventDefault();
      var self = this;
      $.ajax({
        url: '/api/v1/expenses',
        data: { previous: 0 },
        success: function(data) {
          self.props.handlePreviousClick(data, 0);
        },
        error: function(xhr, status, error) {
          alert('error: ', status, xhr, error);
        }
      });
    },
	
	// for deleting expense record
	handleDeleteRecord: function(expense) {
	    this.props.handleDeleteRecord(expense); //refers to handleDeleteRecord method from _index.js.jsx file
	},	

	onUpdate(expense) {
	    this.props.onUpdate(expense);
	},
	
  render: function() {
    total = 0;  
	expenses= this.props.expenses.map((expense) => {
    total = total+expense.price; 

	return ( 
		<Expense expense={expense} key={'expense' + expense.id} handleDeleteRecord={this.handleDeleteRecord} />
	) });

    return(
      <div className="">
        {
          this.props.page == 1
          ? <button type="button" className="btn btn-primary" onClick={this.handlePreviousClick}>Previous month expenses</button>
          : <button type="button" className="btn btn-default" onClick={this.handlePreviousClick}>Previous month expenses</button>
        }
		&nbsp;
        {
          this.props.page == 0
          ? <button type="button" className="btn btn-primary" onClick={this.handleCurrentClick}>Current month expenses</button>
          : <button type="button" className="btn btn-default" onClick={this.handleCurrentClick}>Current month expenses</button>
        }
		
		
		<br/><br/>
		
		<p align="left">Total for below expenses is Rs. {total}</p>
		<table className="table table-bordered table-hover table-striped">
		  <thead>
		    <tr>
		      <th>Amount</th>
		      <th>Reason</th>
		      <th>Details</th>
		      <th>Date</th>
			  <td></td>
		    </tr>
		  </thead>
		  <tbody>
		    {expenses}
		  </tbody>	
		</table>
      </div>
    )
  }
});