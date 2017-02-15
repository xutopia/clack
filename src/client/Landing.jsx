import React, { Component } from 'react';
import { Link } from 'react-router';

// input

export default class Landing extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context)
    console.log('context.router', context.router);
    this.state = {
      currentUser: '',
    }
  }

  onInputChange(event, state) {
    const name = event.target.value;
    this.setState({
      ...state,
      currentUser: name,
    });
  }

  onFormSubmit(event, state) {
    event.preventDefault();
    const name = state.currentUser;
    console.log('inside form submit, context', this.router);
    window.localStorage.setItem('currentUser', name);
    console.log('the form was submitted');
    this.context.router.transitionTo('/messages');
    // transition to the chat room
  }
  render() {
    const { currentUser } = this.state.currentUser;
    return (
      <div>
        <form onSubmit={() => this.onFormSubmit(event, this.state)}>
          <input type="text" placeholder="Enter Name to Chat" value={currentUser} onChange={event => this.onInputChange(event, this.state)} />
        </form>
      </div>
    );
  }
}
