import React from 'react';
import { connect } from 'react-redux';

// In order to access direct messaging, will change this component to a container that has an onClick for anchors, handleClick and it will do a this.context.router push to /PrivateMessage or whatever we call it...
class UserItem extends React.Component {
  handleClick = (event) => {
    // add functionality for whispers here
    console.log('somebody clicked me');
  }

  render() {
    const { user } = this.props;

    return (
      <div onClick={this.handleClick}>
        {user}
      </div>
    )
  }
};

export default UserItem;
