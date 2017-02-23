import React from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import UserItem from '../components/UserItem';

class Directory extends React.Component {
  getUserNames = () => {
    return ['tony', 'pete', 'michelle', 'shelby'];
  // this function will set up my usernames array that is coming down from the server
  }

  render() {
    const { users } = this.props; // this may change as we finish pulling the usernames array down from the server.
    const usernames = ['tony', 'pete', 'michelle', 'shelby'];
    console.log('this is users: ', users);
    return (
      <div>
        <div>
          {usernames ? (usernames.map(user => (
            <UserItem user={user} />
          ))) : (<div>Loading...</div>)}
        </div>
      </div>
    )
  }
}
function select({ users }) { // this will be an array that mirrors the usernames array on the server. this is mapping the state to props for this component.
  return { users };
}

export default connect(select)(Directory)
