import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { createUser } from '../actions/index';

export default class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      messages: [],
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  onFormSubmit(state, name) {
    console.log(state);
    this.setState({
      ...state,
      users: name,
      messages: [],
    });
  }

  render() {
    return (
      <div>
        another baby
        <form onSubmit={this.onFormSubmit}>
          Enter a name to join chat!
          <input placeholder="Name" />
          <span>
            <button type="submit">
              <Link to="/messages">Submit</Link>
            </button>
          </span>
        </form>
      </div>
    );
  }
}

// const mapDispatchToProps = dispatch => bindActionCreators({ createUser }, dispatch);
//
// export default connect(null, mapDispatchToProps)(User);
