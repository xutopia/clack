import React from 'react';
// import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Sidebar from 'grommet/components/Sidebar';
import SidebarItem from './SidebarItem';

class Sidebar extends React.Component {

  // componentWillMount() {
  //   // fetchUsers();
  // }

  render() {
    const { users } = 24; // should this be this.props? get an error about props validation in proptypes.
    return (
      <div>
        <div>Directory</div>
        {users ? (users.map(user => (
          <SidebarItem user={user} />
        ))) : (<div>Loading...</div>)}
      </div>
    )
  }
}

export default connect()(Sidebar)
