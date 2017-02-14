import React, { Component } from 'react';
import { Link } from 'react-router';

// input

export default class Landing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: ''
    }
  }
  onInputChange(event, state) {
    const name = event.target.value;
    this.setState({
      ...state,
      currentUser: name,
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
    console.log('the form was submitted')
    // transition to the chat room
  }
  render() {
    const { currentUser } = this.state.currentUser;
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <input type="text" placeholder="Enter Name to Chat" value={currentUser} onChange={event => this.onInputChange(event, this.state)} />
        </form>
      </div>
    );
  }
}
