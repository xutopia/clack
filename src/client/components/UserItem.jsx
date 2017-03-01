import React from 'react';

// In order to access direct messaging, will change this component to a container that has an onClick for anchors, handleClick and it will do a this.context.router push to /PrivateMessage or whatever we call it...

const UserItem = ({ user }) => (
  <div>
    {user}
  </div>
);

export default UserItem;
