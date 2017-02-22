import React from 'react';
import { connect } from 'react-redux';
import Menu from 'grommet/components/Menu';
import Box from 'grommet/components/Box';
import UserItem from './UserItem';

class Directory extends React.Component {

// need componentWillMount
// need componentWillUpdate
// need getUserlist to be defined and run within each of the above methods.

  render() {
    const { users } = 24; // still need to figure out how and where to get this functionality
    return (
      <Box>
        <Menu>
          {users ? (users.map(user => (
            <UserItem user={user} />
          ))) : (<div>Loading...</div>)}
        </Menu>
      </Box>
    )
  }
}

export default connect()(Directory)
