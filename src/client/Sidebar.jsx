import React, { Component } from 'react';
import ReactDOM from 'react-dom';  // needed?
import axios from 'axios';

export default class Sidebar extends Component { // need default here?
  constructor(props) {
    super(props);
    this.state = {
      users: null,
    };
  }

  componentWillMount() {
    axios.get('/api/user/fetch')
    // .then(res => res.json())
      .then((users) => {
        this.setState({ users });
      })
      .catch((error) => {
        console.err(error);
      });
  }

  render() {
    const { users } = this.state;
    return (
      <Sidebar>
        <div>Directory</div>
        {users ? (
          users.map(user => (
            <SidebarItem>
              {user}
            </SidebarItem>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </Sidebar>
    );
  }
}
