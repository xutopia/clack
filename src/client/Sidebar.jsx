import React, { Component } from 'react';
import SidebarItem from './SidebarItem';
import fetchUserlist from './actions/userlistAction';
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
