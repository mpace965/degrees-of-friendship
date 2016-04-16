var React = require('react');
var $ = require('jquery');
var d3 = require('d3');
import Paper from 'material-ui/lib/paper';
import CircularProgress from 'material-ui/lib/circular-progress';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Snackbar from 'material-ui/lib/snackbar';

var LastfmResultView = require('./lastfmResultView');

var LastfmSiteSearchView = React.createClass({
  getInitialState: function() {
    return {
      connectionBegin: '',
      connectionEnd: '',
      apiResponse: {},
      apiRequest: {},
      apiLoading: false,
      snackbarOpen: false,
      snackbarMessage: ''
    };
  },

  //Make the api request to the server
  loadChainFromServer: function() {
    var request = $.ajax({
        url: '/api/connectLastfm',
        dataType: 'json',
        cache: false,
        data: {begin: this.state.connectionBegin, end: this.state.connectionEnd},
        success: function(data) {
          this.setState({apiResponse: data}, function() {
            this.setState({apiLoading: false});
            var newGraph = this.processApiResponse();
            this.props.setActiveView(LastfmResultView, {graph: newGraph});
          });
        }.bind(this),
        error: function(xhr, status, err) {
          this.setState({apiLoading: false});
          this.setState({snackbarOpen: true, snackbarMessage: xhr.responseText});
          console.error('/api/connectLastfm', status, err.toString());
        }.bind(this)
    });

    this.setState({apiLoading: true, apiRequest: request});
  },

  processApiResponse: function() {
    var graph = {
      nodes: d3.range(this.state.apiResponse.nodeCount).map(Object),
      links: this.state.apiResponse.edgeList,
      nodeValues: this.state.apiResponse.nodeValues
    };

    return graph;
  },

  //Handle input changes by updating the state.
  handleConnectionBeginChange: function(e) {
    this.setState({connectionBegin: e.target.value});
  },

  handleConnectionEndChange: function(e) {
    this.setState({connectionEnd: e.target.value});
  },

  handleKeyDown: function(e) {
    //Submit on newline
    if (e.keyCode == 13) {
      this.handleSubmit();
    }
  },

  handleSubmit: function() {
    //basic string sanitation
    var connectionBegin = this.state.connectionBegin.trim();
    var connectionEnd = this.state.connectionEnd.trim();

    if (!connectionBegin || !connectionEnd) {
      //add error message
      return;
    }

    this.loadChainFromServer();
    this.setState({connectionBegin: '', connectionEnd: ''});
  },

  handleCancel: function() {
    this.state.apiRequest.abort();
  	this.replaceState(this.getInitialState());
  },

  handleRequestClose: function() {
    this.setState({snackbarOpen: false, snackbarMessage: ''});
  },

  render: function() {
    var circularProgress;
	  var cancelButton;

    if (this.state.apiLoading) {
      cancelButton = <RaisedButton label="Cancel" onMouseUp={this.handleCancel} />;
      circularProgress = <CircularProgress />;
    }

    const style = {
      height: '75%',
      width: '75%',
      padding: 10,
      margin: 20
    }

    return (
      <div className="siteSearchView">
        <Paper style={style} zDepth={1}>
          <h2 className="flexRowItem">Connect two artists on Last.fm</h2>
          <div className="flexRowItem">
            <TextField
              hintText="Connect one artist"
              value={this.state.connectionBegin}
              onChange={this.handleConnectionBeginChange}
              onKeyDown={this.handleKeyDown} />
            <TextField
              hintText="to another"
              value={this.state.connectionEnd}
              onChange={this.handleConnectionEndChange}
              onKeyDown={this.handleKeyDown} />
            <RaisedButton label="Submit" onMouseUp={this.handleSubmit} />
          </div>
          <div className="flexRowItem">{circularProgress}</div>
          <div className="flexRowItem">{cancelButton}</div>
        </Paper>
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          autoHideDuration={7000}
          onRequestClose={this.handleRequestClose} />
      </div>
    );
  }
});

module.exports = LastfmSiteSearchView;
