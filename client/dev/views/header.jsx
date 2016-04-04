var React = require('react');
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

var LandingPage = require('./landingPage');
var AdjacencyListSiteSearchView = require('./adjacencyListSiteSearchView');
var AboutPage = require('./aboutPage');

var Header = React.createClass({
  getInitialState: function() {
    return {
      open: false
    };
  },

  handleTitleTap: function() {
    this.props.setActiveView(LandingPage);
    this.setState({open: false});
  },

  handleLeftTap: function() {
    this.setState({open: true});
  },

  handleAboutTap: function() {
    this.props.setActiveView(AboutPage);
    this.setState({open: false});
  },

  handleAdjListTap: function() {
    this.props.setActiveView(AdjacencyListSiteSearchView);
    this.setState({open: false});
  },
  
    handleHomeTap: function() {
    this.props.setActiveView(LandingPage);
    this.setState({open: false});
  },

  handleLastfmTap: function () {
    //this.props.setActiveView(LastfmSiteSearchView);
    this.setState({open: false});
  },

  render: function() {
    return (
      <div>
        <AppBar
          title="Degrees of Separation"
          titleStyle={{
            cursor: 'pointer'
          }}
          onTitleTouchTap={this.handleTitleTap}
          onLeftIconButtonTouchTap={this.handleLeftTap} />
        <LeftNav open={this.state.open} docked={false} onRequestChange={open => this.setState({open})}>
          <List>
            <ListItem primaryText="Home" onTouchTap={this.handleHomeTap}/>
            <ListItem primaryText="About" onTouchTap={this.handleAboutTap}/>
            <ListItem
              primaryText="Connect"
              initiallyOpen={false}
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem key={1} primaryText="Adjacency List" onTouchTap={this.handleAdjListTap} />,
                <ListItem key={2} primaryText="Last.fm" onTouchTap={this.handleLastfmTap} />
              ]} />
          </List>
        </LeftNav>
      </div>
    );
  }
});

module.exports = Header;
