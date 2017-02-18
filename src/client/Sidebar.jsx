import React, { Component } from 'react';
import SidebarItem from './SidebarItem';

export default class Sidebar extends Component {
  componentWillMount() {
    fetchUsers();
  }

  render() {
    const { users } = this.state;
    return (
      <div>
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
      </div>
    )
  }
}
