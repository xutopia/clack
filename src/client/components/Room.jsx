import React from 'react'
import { connect } from 'react-redux';
import { Container, Divider, Header, Grid, Segment, Menu, Sidebar, Button, Icon } from 'semantic-ui-react';

import UserList from '../containers/UserList.jsx';
import MessageFeed from '../containers/MessageFeed.jsx';
import MessageInput from '../containers/MessageInput.jsx';
import SearchSidebar from '../containers/SearchSidebar.jsx';
import SearchBar from '../containers/SearchBar.jsx';
import SearchResults from '../containers/SearchResults.jsx';
import User from '../containers/User.jsx';
//'#A9D9D9', A7CCCC
const Room = () => {
  // const fonts = {
  //   'font-family': 'bohemian_typewriterregular',
  //   src: url('bohemian_typewriter-webfont.woff2') format('woff2'),
  //        url('bohemian_typewriter-webfont.woff') format('woff'),
  //   'font-weight': 'normal',
  //   'font-style': 'normal'
  // }
  const leftStyles = {
    background: '#BFE3E3'
  }
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
    top: '75px',
    bottom: '50px',
    left: '20px',
    right: '0px',
    overflow: 'auto'
  }
  const bottomStyles = {
    position: 'absolute',
    bottom: '20px',
    height: '45px',
    left: '10px',
    right: '0px',
    overflow: 'hidden'
  }

  const appStyle = {
    height: '100%',
    width: '100%'
  }

  const centerText = {
    width: '50%',
    margin: '0 auto'
  }

  const middleCenter = {
    width: '75%',
    margin: '0 auto'
  }
  return (
    <Grid columns={3} style={appStyle}>
      <Grid.Column width={4} style={leftStyles}>
        <Container>
          <Header size='large' style={centerText}>
          CLACK Chat!
          </Header>
          <Divider />
          <Segment vertical>
            <h2 style={centerText}>Who's Here?</h2>
          </Segment>
          <Segment vertical>
            <UserList style={centerText} />
          </Segment>
        </Container>
      </Grid.Column>
      <Grid.Column width={8} style={appStyle}>
        <div style={topStyles}>
          <Segment vertical>
            <h2 style={middleCenter}><User />
            </h2>
            <Divider />
          </Segment>
        </div>
        <Container text style={middleStyles}>
          <MessageFeed />
        </Container>
        <div style={bottomStyles}>
          <MessageInput />
        </div>
      </Grid.Column>
      <Grid.Column width={4}>
        <SearchSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default connect()(Room);
