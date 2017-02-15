import React, { Component } from 'react';
import { Link } from 'react-router';

// input

export default class Landing extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context)
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
    window.localStorage.setItem('currentUser', name);
    this.context.router.transitionTo('/messages');
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
