import React from 'react'
import { connect } from 'react-redux';
import { Container, Header, Grid, Segment, Menu, Sidebar, Button, Icon } from 'semantic-ui-react';

import UserList from '../containers/UserList.jsx';
import MessageFeed from '../containers/MessageFeed.jsx';
import MessageInput from '../containers/MessageInput.jsx';
import SearchSidebar from '../containers/SearchSidebar.jsx';
import SearchBar from '../containers/SearchBar.jsx';
import SearchResults from '../containers/SearchResults.jsx';

const Room = () => {
  const topStyles = {
    position:'absolute',
    top: '15px',
    left: '0px',
    height: '100px',
    right: '0px',
    overflow: 'hidden'
  }
  const middleStyles = {
    position: 'absolute',
    top: '65px',
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
    <Grid columns={3} style={appStyle}>
      <Grid.Column width={4}>
        <Container>
          <Header>
          CLACK Chat!
          </Header>
          <Segment vertical>
            <h2>Users in the Room</h2>
            <UserList />
          </Segment>
        </Container>
      </Grid.Column>
      <Grid.Column width={6} style={appStyle}>
        <div style={topStyles}>
          <Segment vertical>
            <h2>Users name here?
              </h2>
          </Segment>
        </div>
        <Container text style={middleStyles}>
          <MessageFeed />
        </Container>
        <div style={bottomStyles}>
          <MessageInput />
        </div>
      </Grid.Column>
      <Grid.Column width={6}>
        <SearchSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default connect()(Room);
