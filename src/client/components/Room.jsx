import React from 'react'
import { connect } from 'react-redux';
import { Container, Header, Grid, Segment, Menu, Sidebar, Button } from 'semantic-ui-react';

import UserList from '../containers/UserList.jsx';
import MessageFeed from '../containers/MessageFeed.jsx';
import MessageInput from '../containers/MessageInput.jsx';
import SearchBar from '../containers/SearchBar.jsx';
import SearchResults from '../containers/SearchResults.jsx';

class Room extends React.Component {
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
  const topStyles = {
    position:'absolute',
    top: '10px',
    left: '0px',
    height: '100px',
    right: '0px',
    overflow: 'hidden'
  }
  const middleStyles = {
    position: 'absolute',
    top: '60px',
    bottom: '50px',
    left: '0px',
    right: '0px',
    overflow: 'auto'
  }
  const bottomStyles = {
    position: 'absolute',
    bottom: '0px',
    height: '50px',
    left: '0px',
    right: '0px',
    overflow: 'hidden'
  }

  const appStyle = {
    height: '100%',
    width: '100%'
  }

  return (
    <Grid columns={2} style={appStyle}>
      <Grid.Column width={4}>
        <Container>
          <Header>
          CLACK Chat!
          </Header>
          <Segment vertical>
            <h2>Users in the Room</h2>
            <UserList>
            Segment/Directory Goes Here
            </UserList>
          </Segment>
          <Segment vertical>
          </Segment>
          <Segment vertical>
          </Segment>
        </Container>
      </Grid.Column>
      <Grid.Column width={12} style={appStyle}>
          <div style={topStyles}>
            <Menu fluid>
              <Menu.Item position='right'>
                <Button onClick={this.toggleVisibility}>SEARCH</Button>
              </Menu.Item>
            </Menu>
          </div>
        <div style={middleStyles}>
          <Sidebar.Pushable>
            <Sidebar as={Menu}
              animation='overlay'
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
              <MessageFeed />
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
        <div style={bottomStyles}>
          <MessageInput>
          </MessageInput>
        </div>
      </Grid.Column>
    </Grid>
    );
  };
};

export default connect()(Room);
