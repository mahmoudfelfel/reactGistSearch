/** @jsx React.DOM */

var React = require('react'),
	SearchBox = require('./searchBox'),
	ResultList = require('./resultList');


var SearchApp = React.createClass({
	getInitialState: function(){
		var RESULTS_LIST = [{title: 'felfel'}, {title: 'felfel3'}, {title: 'felfel4'}, {title: 'felfel5'}];
		return {
			items: [],
			keyword : ""
		}
	},
	
	startSearch: function (e) {
		e.preventDefault();
		$.ajax({
			url: "https://api.github.com/users/" + this.state.keyword + "/gists",
			success: function (result) {
		    	console.log(result);
		    	this.setState({items: result});
			}.bind(this)
		});

		console.log('state ',this.state);
	},

	updateInput:function (e) {
		e.preventDefault();
		this.setState({keyword: e.target.value});
	},

	render: function() {
		return (
			<div>
				<div className="searchBox-wrapper">
					<SearchBox startSearch={this.startSearch} updateInput={this.updateInput} value={this.state.keyword} />
				</div>
				<div><ResultList items={this.state.items} /></div>
			</div>
		);
	}

});

module.exports = SearchApp;