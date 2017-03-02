import React from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import UserItem from './UserItem.jsx';

class UserList extends React.Component {

  render() {
    const { users } = this.props;
    // const usernames = ['tony', 'pete', 'michelle', 'shelby'];
    console.log('this is users: ', users);
    const usernames = this.props.usernames.sort();
    console.log('this is usernames: ', usernames);
    return (
      <div>
        <div>
          {usernames ? (usernames.map((user, index) => {
            if(this.props.app.username === user) {
              const me = `${user} (me)`;
              return (<UserItem user={me} key={index} />)
            } else {
              return (<UserItem user={user} key={index} />)
            }
          })) : (<div>Loading...</div>)}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ app, usernames, users }) {
  return { app, usernames, users };
}

export default connect(mapStateToProps)(UserList)
