import React from 'react'
import { connect } from 'react-redux';
import { Container, Header, Grid, Segment } from 'semantic-ui-react';

import UserList from '../containers/UserList.jsx';
import MessageFeed from '../containers/MessageFeed.jsx';
import SearchBar from '../containers/SearchBar.jsx';
import SearchResults from '../containers/SearchResults.jsx';

const Room = () => (
  <Grid columns={3}>
    <Grid.Column width={4}>
      <Container>
        <Header>
        CLACK Chat!
        </Header>
        <Segment vertical>
          <UserList>
          Segment/Directory Goes Here
          </UserList>
        </Segment>
      </Container>
    </Grid.Column>
    <Grid.Column width={8}>
      <Container>
        <MessageFeed>
          Feed will go inside here
        </MessageFeed>
      </Container>
    </Grid.Column>
    <Grid.Column width={4}>
      <Container>
        <SearchBar />
        <SearchResults />
      </Container>
    </Grid.Column>
  </Grid>
);

export default connect()(Room);
