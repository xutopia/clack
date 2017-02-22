import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react'

import { login } from './actions/actions'

class Landing extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: ''
    }
  }
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  onInputChange(event, state) {
    const username = event.target.value;
    console.info('username', username);
    this.setState({
      ...state,
      currentUser: username,
    });
  }

  onFormSubmit(event, state) {
    event.preventDefault();
    const username = state.currentUser;
    window.localStorage.setItem('currentUser', username);
    this.props.dispatch(login({ username }))
    this.context.router.push('/room');
  }
  render() {
    const { currentUser } = this.state.currentUser;
    return (
      <div>
        <h1>Welcome!!!</h1>
        <Form onSubmit={() => this.onFormSubmit(event, this.state)}>
          <Form.Field>
            <input 
            onChange={(event) => this.onInputChange(event, this.state)}
            type="text" placeholder="Enter Name to Chat"
            value={currentUser}
            />
          </Form.Field>
        </Form>
      </div>
    );
  }
}

export default connect()(Landing)
