var Index = React.createClass({
	getInitialState() { 
		return { 
			expenses: [],
			previous: 0
		} 
	},
	
	handleSearch: function(data) {
		this.setState({expenses: data.expenses})
	},
	
	componentDidMount() {
		// this happens first time page is loaded
		this.setState({expenses: this.props.data })
	},
	
    handleSubmit(expenses) {
        var newState = expenses;
        this.setState({ expenses: newState })
    },
	
	// for deleting expense record
	handleDeleteRecord: function(expense) {
	    var expenses = this.state.expenses.slice();
	    var index = expenses.indexOf(expense);
	    expenses.splice(index, 1);
	    this.setState({ expenses: expenses });
	},
	

	
	// This is called when "previous month" link is clicked
	handlePreviousClick(data, page){
     this.setState({expenses: data.expenses, previous: page})
	},
	
    removeExpenseClient(id) {
        var newExpenses = this.state.expenses.filter((expense) => {
            return expense.id != id;
        });

        this.setState({ expenses: newExpenses });
    },
	
	handleUpdate(expense) {
        $.ajax({
                url: `/api/v1/expenses/${expense.id}`,
                type: 'PUT',
                data: { expense: expense},
                success: () => {
                    this.updateExpenses(expense);
                }
            }
    )},
	
    updateExpenses(expense) {
        var expenses = this.state.expenses.filter((i) => { return i.id != expense.id });
        expenses.push(expense);

        this.setState({expenses: expenses });
    },
	
    render: function() {
      return(
        <div className="container">

	        <div className="row pull-right">
		      <div className="col-md-12">
			    <SearchForm handleSearch={this.handleSearch} previous={this.state.previous}/>
			  </div>
			</div>
		
		
			<a href="#collapseExample" aria-controls="collapseExample" aria-expanded="false" data-toggle="collapse" role="button">
			  <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Expense</a>
		
			<NewExpense handleSubmit={this.handleSubmit} current_user_id={this.props.current_user_id} />
		    <br/><br/>
		
			<Expenses comp='expenses' expenses={this.state.expenses} onUpdate={this.handleUpdate} 
			handleDeleteRecord={this.handleDeleteRecord} handlePreviousClick={this.handlePreviousClick} page={this.state.previous}/>

        </div>
      )
    }
});