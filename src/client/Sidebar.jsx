import React, { Component } from 'react';
import SidebarItem from './SidebarItem';

// import the actions file for the fetchusers function that still needs to be written.
// NOTE THAT THIS FILE NEEDS REFACTORING FOR REDUX FUNCTIONALITY
export default class Sidebar extends Component {

  componentWillMount() {
    fetchUsers();
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <div>Directory</div>
        {users ? (users.map(user => (
          <SidebarItem>{user}</SidebarItem>
        ))) : (<div>Loading...</div>)}
      </div>
    )
  }
}
