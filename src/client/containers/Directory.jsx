import React from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import UserItem from '../components/UserItem';

class Directory extends React.Component {
  // getUserlist = () => {
  // this function will set up my usernames array that is coming down from the server
  // }

  componentWillMount
// need componentWillMount
// need componentWillUpdate
// need getUserlist to be defined and run within each of the above methods.

  render() {
    const { users, app } = this.props; // still need to figure out how and where to get this functionality
    console.log('this is the app object: ', app);
    return (
      <div>
        <div>
          {users ? (users.map(user => (
            <UserItem user={user} />
          ))) : (<div>Loading...</div>)}
        </div>
      </div>
    )
  }
}

export default connect()(Directory)
