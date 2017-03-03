import React from 'react'
import { connect } from 'react-redux';
import { Container, Divider, Header, Grid, Segment, Menu, Sidebar, Button, Icon } from 'semantic-ui-react';
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
    const sidebarStyle = {
      opacity: '1.0',
      'background-color': 'white'
    }

    const searchBarStyle = {
      width: '60%',
      margin: '0 auto'
    }
    const centerText = {
      width: '60%',
      margin: '20px auto'
    }

    return (
      <Sidebar.Pushable>
        <Sidebar as={Segment}
          animation='overlay'
          width='wide'
          direction='right'
          visible={this.state.visible}
          icon='labeled'
          style={sidebarStyle}
          vertical>
          <Menu.Item>
            <Button basic icon floated='right' size='medium'
            onClick={this.toggleVisibility}>
              <Icon name='close' size='medium'/>
            </Button>
          </Menu.Item>
          <Menu.Item name='searchbar' style={searchBarStyle}>
            <SearchBar />
            <Divider section hidden />
          </Menu.Item>
          <Menu.Item name='searchResults'>
            <h3 style={centerText}>RESULTS</h3>
          </Menu.Item>
          <Menu.Item name='resultsList'>
              <h3 style={centerText}>
              <SearchResults style={centerText}/>
              </h3>
            </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
          <h2></h2>
          <Button basic icon floated='right'  onClick={this.toggleVisibility}>
          <Icon name='search' />
          </Button>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    )
  }
}

export default connect()(SearchSidebar);
