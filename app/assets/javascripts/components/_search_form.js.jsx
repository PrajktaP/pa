var SearchForm = React.createClass({
	
  handleSearch: function() {
    var query = ReactDOM.findDOMNode(this.refs.query).value;
    var self = this;
    $.ajax({
      url: '/api/v1/expenses',
      data: { query: query, previous: this.props.previous},
      success: function(data) {
        self.props.handleSearch(data);
      },
      error: function(xhr, status, error) {
        alert('Search error: ', status, xhr, error);
      }
    });
  },
  
  render: function() {
    return(
      <input onChange={this.handleSearch}
             type="text"
             className="form-control"
             placeholder="Search..."
             ref="query" />
    )
  }
});