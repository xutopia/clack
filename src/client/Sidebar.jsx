import React from 'react';
// import React, { Component } from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD

import Header from 'grommet/components/Header';
import SidebarItem from './SidebarItem';
// import the actions file for the fetchusers function that still needs to be written.
// NOTE THAT THIS FILE NEEDS REFACTORING FOR REDUX FUNCTIONALITY
// NEED TO DEFINE SidebarItem
=======
// import Sidebar from 'grommet/components/Sidebar';
import SidebarItem from './SidebarItem';
>>>>>>> userlist-mon-2-20

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
