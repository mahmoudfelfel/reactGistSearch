/** @jsx React.DOM */

var React = require('react');

var ForksListItem = React.createClass({

	render: function() {
		return (
            <a className="fork-element" target="_blank" >
                <img src={this.props.imgSrc} />
                <span className="fork-data"> <b>by: </b>{this.props.owner}, <b>last updated: {this.props.updateDate}</b></span>
            </a>
		);
	}

});

module.exports = ForksListItem;