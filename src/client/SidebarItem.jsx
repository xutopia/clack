import React from 'react';
import { connect } from 'react-redux';

const SidebarItem = ({ user }) => (
  <div>
    {user.username}
  </div>
);

export default SidebarItem;
