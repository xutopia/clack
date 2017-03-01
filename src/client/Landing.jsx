import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react'

import { login, doubleNameError } from './actions/actions'

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
    this.props.dispatch(login({ username }));
    console.log(this.props.app);
    if(!this.props.app.usernames.includes(username)) {
      event.preventDefault()
      window.localStorage.setItem('currentUser', username);
      this.props.dispatch(login({ username }))
      this.context.router.push('/room');
    } else {
      event.preventDefault()
      window.alert(`Uh Oh, looks like someone already has this username, and we certainly don't want naming confusion in the chat. Please enter a different name to join!`);
    }
  }
  render() {
    const { currentUser } = this.state.currentUser;
    return (
      <div>
        <h1>Welcome!!!</h1>
        <Form onSubmit={(event) => this.onFormSubmit(event, this.state)}>
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

const mapStateToProps = ({ app }) => {
  return { app };
}

export default connect(mapStateToProps)(Landing)
