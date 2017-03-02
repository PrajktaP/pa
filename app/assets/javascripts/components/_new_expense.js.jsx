var NewExpense= React.createClass({ 
	handleClick() { 
		var price = this.refs.price.value; 
		var reason = this.refs.reason.value;
		var details = this.refs.details.value;
		var current_user_id = this.props.current_user_id;
		{   
			price != "" && reason != ""
			? $.ajax({ 
				url: '/api/v1/expenses', 
				type: 'POST', 
				data: { expense: { price: price, reason: reason, user_id: current_user_id, details: details } }, 
				success: (expenses) => {
					this.refs.price.value = "";
					this.refs.reason.value = "";
					this.refs.details.value = "";
					this.props.handleSubmit(expenses); 
					// $("#ticket_form").click();
				}
		        })
			:null	
	    }
    },
    handleChange(event) {
      this.setState({value: event.target.value});
    },
	
	render() { 
		return ( 
			<div id='collapseExample' className='collapse'>
			  <p className='well'>
			    <input ref='price' id='expense_price' placeholder='Price' className="form-control" />&nbsp;
				<input ref='reason' id='expense_reason' placeholder='Reason' className="form-control" />&nbsp;
				<textarea ref='details' id='expense_details' placeholder='Details' className="form-control" />&nbsp;
				<button onClick={this.handleClick} className="btn btn-default">Submit</button>
			  </p>
			</div>
	) }
});