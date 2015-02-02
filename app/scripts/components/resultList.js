/** @jsx React.DOM */

var React = require('react'),
	ResultItem = require('./resultItem');

var ResultList = React.createClass({

	render: function() {
		var displayList = { display: (this.props.items.length === 0) ? 'none' : 'block' };
		var resultItems = this.props.items.map(function(item){
			return <ResultItem item={item} description={item.description} updateDate={item.updated_at} owner={item.owner.login} gistId={item.id} />
		});


		return (
			<div className="gist-list" style={ displayList }>
			    <ul>
			    	{resultItems}
			    </ul>
			</div>
		);
	}

});

module.exports = ResultList;