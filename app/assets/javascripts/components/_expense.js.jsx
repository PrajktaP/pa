var Expense = React.createClass({
	// for deleting expense record
	handleDelete: function(e) {
	    e.preventDefault();
	    $.ajax({
	      method: 'DELETE',
	      url: '/api/v1/expenses/' + this.props.expense.id,
	      success: function(data) {
	        this.props.handleDeleteRecord(this.props.expense); //refers to handleDeleteRecord method from _expenses.js.jsx file
	      }.bind(this),
	      error: function(xhr, status, error) {
	        alert('Cannot delete requested record: ', error);
	      }
	    });
	  },
	  
    render: function() {
      var expense = this.props.expense;
      return(
	    <tr key={expense.id}>
		  <td>{expense.price}</td>
	  	  <td>{expense.reason}</td>
		  <td>{expense.details.trimToLength(50)}</td>
		  <td>{strftime('%d %b %H:%M', new Date(expense.created_at))}</td>
		  <td>
		  
			<a href="" onClick={this.handleDelete}>
			<span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
		    &nbsp;&nbsp;
			
			<a href="">
			<span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>
		  </td>
	    </tr>
      )
    }
});