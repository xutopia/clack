import React from 'react'
import { connect } from 'react-redux';
import { Container, Header, Grid, Segment, Menu, Sidebar, Button, Icon } from 'semantic-ui-react';
import SearchBar from '../containers/SearchBar.jsx';
import SearchResults from '../containers/SearchResults.jsx';

class SearchSidebar extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false
    }
  }
  toggleVisibility = () => {
    console.log('clicked!')
    return this.setState({ visible: !this.state.visible })
  }

  render() {
    return (
      <Sidebar.Pushable>
        <Sidebar as={Segment}
          animation='push'
          width='wide'
          direction='right'
          visible={this.state.visible}
          icon='labeled'
          vertical>
          <Menu.Item name='searchbar'>
            <SearchBar />
          </Menu.Item>
          <Menu.Item name='searchresults'>
            <SearchResults />
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
          <Button basic icon floated='right'  onClick={this.toggleVisibility}>
          <Icon name='search' />
          </Button>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    )
  }
}

export default connect()(SearchSidebar);
