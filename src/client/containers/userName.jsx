import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createUser } from '../actions/index';

class User extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  onFormSubmit(name) {
    this.props.createUser(name);
  }

  render() {
    return (
      <div>
        another baby
        <form onSubmit={() => this.onFormSubmit()}>
          Enter a name to join chat!
          <input placeholder="Name" />
          <span>
            <button type="submit">Submit</button>
          </span>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ createUser }, dispatch);

export default connect(null, mapDispatchToProps)(User);
