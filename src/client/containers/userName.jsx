import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createUser } from '../actions/index';

class User extends Component {
  onFormSubmit(name) {
    this.props.createUser(name);
  }

  render() {
    return (
      <div>
        another baby
        <form onSubmit={() => this.onFormSubmit()}>
          Enter a
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ createUser }, dispatch);
};

export default connect(null, mapDispatchToProps)(User);
