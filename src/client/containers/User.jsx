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
    this.setState({
      ...state,
      users: name,
      messages: [],
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          Enter a name to join chat!
          <br/>
          <input placeholder="Name" />
          <span>
            <Link to="/messages">
                <button type="submit">
                Submit
              </button>
            </Link>
          </span>
        </form>
      </div>
    );
  }
}

// const mapDispatchToProps = dispatch => bindActionCreators({ createUser }, dispatch);
//
// export default connect(null, mapDispatchToProps)(User);
