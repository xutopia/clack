import React from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import UserItem from '../components/UserItem.jsx';

class UserList extends React.Component {

  render() {
    const { users } = this.props;
    // const usernames = ['tony', 'pete', 'michelle', 'shelby'];
    console.log('this is users: ', users);
    let usernames = Object.keys(users);
    console.log('this is usernames: ', usernames);
    return (
      <div>
        <div>
          {usernames ? (usernames.map((user, index) => (
            <UserItem user={user} key={index}/>
          ))) : (<div>Loading...</div>)}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return { users };
}

export default connect(mapStateToProps)(UserList)
