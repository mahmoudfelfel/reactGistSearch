var React = require('react');

var FileDetails = React.createClass({

	render: function() {
		var tagClass = "gist-element-tag pull-right label label-default tag-" + this.props.file.language;
		return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <b>{this.props.file.filename}</b>
                    <span className={tagClass}>{this.props.file.language}</span>
                </div>
                <div className="panel-body" >
                    <pre className="language-javascript">
                    	<code className="language-javascript">
                    		{this.props.file.content}
                    	</code>
                    </pre>
                </div>
            </div>
		);
	}

});

module.exports = FileDetails;