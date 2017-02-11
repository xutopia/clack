import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { createUser } from '../actions/index';

export default class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
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

  onInputChange(val, state) {
    this.setState({
      ...state,
      name: val,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          Enter a name to join chat!
          <br />
          <input
            placeholder="Name"
            type="text"
            value={this.state.message}
            onChange={event => this.onInputChange(event.target.value, this.state)}
          />
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
