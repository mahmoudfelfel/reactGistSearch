/** @jsx React.DOM */

var React = require('react');

var SearchBox = React.createClass({

	render: function() {
		var value = this.props.value;
		return (
			<div className="card-wrapper row">
    			<form name="searchForm" className="search-form" onSubmit={this.props.startSearch}>
			        <div className="col-sm-12">
			            <input type="text" name="searchInput" id="searchInput" value={value} onChange={this.props.updateInput} className="search-input" placeholder="search by user name ... e.g. AddyOsmani" />
			        </div>
    			</form>
			</div>
		);
	}

});

module.exports = SearchBox;