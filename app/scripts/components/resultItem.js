/** @jsx React.DOM */

var React = require('react'),
	ForksListItem = require('./forksList'),
	FileDetails = require('./fileDetails'),
	Modal = require('./react-modal');

Modal.setAppElement(document.getElementById('app'));
Modal.injectCSS();

var ResultItem = React.createClass({
	getInitialState: function(){
		return {
			forks: [],
			gistFiles: [],
			showForks: false,
			modalIsOpen: false
		}
	},
	openModal: function() {
    	this.setState({modalIsOpen: true});
  	},

  	closeModal: function() {
    	this.setState({modalIsOpen: false});
  	},
	
	getForks: function (e) {
		console.log(e);
		$.ajax({
			url: "https://api.github.com/gists/" + this.props.gistId + "/forks",
			success: function (result) {
		    	console.log(result);
		    	this.setState({forks: result, showForks: true});
				console.log('state ',this.state);
			}.bind(this)
		});

	},
	getGistDetails: function (e) {
		console.log(e);
		$.ajax({
			url: "https://api.github.com/gists/" + this.props.gistId,
			success: function (result) {
		    	console.log(result);
		    	this.setState({gistFiles: result.files, modalIsOpen: true});
				console.log('state ',this.state);
			}.bind(this)
		});

	},

	render: function() {
		var forks = this.state.forks,
		updateDate = new Date(this.props.updateDate);
		updateDate = updateDate.toDateString();

		var showForksStyle = {
			display: (this.state.forks.length > 3 && this.state.showForks) ? 'block': 'none'
		},

		showNoForksStyle = {
			display: (this.state.forks.length === 0 && this.state.showForks) ? 'block': 'none'
		},

		forksHref = "https://gist.github.com/" + this.props.owner + "/" + this.props.gistId + "/forks",
		forksListItems = this.state.forks.map(function(fork){
			if(forks.indexOf(fork) < 3){
				return <ForksListItem imgSrc={fork.owner.avatar_url} owner={fork.owner.login} updateDate={fork.updated_at} />
			}
		}),

		gistFilesDetails = [];
		for (key in this.state.gistFiles){
		    gistFilesDetails.push(<FileDetails file={this.state.gistFiles[key]} />)
		}

		var tags = [],
		tagNames = []
		for (key in this.props.item.files){
			if( tagNames.indexOf(this.props.item.files[key].language) === -1 ){
				tagNames.push(this.props.item.files[key].language);
				var tagClasses = "gist-element-tag pull-right label label-default tag-" + this.props.item.files[key].language;
			    tags.push(<span className={tagClasses}  >{this.props.item.files[key].language}</span>)
			}
		}

		var filesList = [];
		for (key in this.props.item.files){
		    filesList.push(<a className="text-muted" href={this.props.item.files[key].raw_url} target="_blank" >{this.props.item.files[key].filename}  </a>)
		}


		return (
	        <li className="gist-element card-wrapper" >
	            <div>
	                <div className="pull-right">
	                    <span className="expand-icon glyphicon glyphicon-resize-full pull-right" onClick={this.getGistDetails}></span>
	                </div>
	                <span className="gist-element-description">{this.props.description}</span>
	                <div className="gist-element-data">
	                    <span><b>last update:</b> {updateDate}</span>
	                    <div><b>Files: </b>
	                        {filesList}
	                    </div>
	                </div>
	                <div className="gist-element-footer row">
	                    {tags}
	                    <div className="pull-left">
	                        <button className="btn btn-default forks-btn" onClick={this.getForks}>Forks</button>
	                        <button className="btn btn-default">Comments</button>
	                    </div>
	                </div>
	            </div>
		        <span className="forks-panel" >
	                <div className="text-muted text-center" style={showNoForksStyle} >There Is No Forks For this Gist !</div>
	 	            	{forksListItems}
	                <a className="fork-element-footer" target="_blank" style={showForksStyle} href={forksHref}>This gist have <span className="badge"> {this.state.forks.length - 3}</span> more fork(s) !</a>
	            </span>
	                <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} >
						<div ng-if="!loading">
						    <span className="collapse-icon glyphicon glyphicon-resize-small pull-right" onClick={this.closeModal}></span>
						    <h1>{this.props.description}</h1>
						    <div>
						        <h3><b>last update:</b> {this.props.updateDate}</h3>
						        <div>
						            <h3>Files:</h3>
						            {gistFilesDetails}
						        </div>
						    </div>
						</div>
			        </Modal>
	        </li>
		);
	}

});

module.exports = ResultItem;