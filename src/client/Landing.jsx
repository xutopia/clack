import React, { Component } from 'react';
import { Router } from 'react-router';

// input

export default class Landing extends Component {
  constructor(props, context) {
    super(props, context)
    console.log('context.router', context.router);
    this.state = {
      currentUser: '',
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    const { router } = this.context;
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
    console.log('inside form submit, context', this.router);
    router.transitionTo('/messages');
    console.log('the form was submitted');
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
