import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { setCurrentUser } from './actions/actions'

class Landing extends Component {
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
    this.props.setCurrentUser(name)
    this.context.router.push('/room');
  }
  render() {
    const { currentUser } = this.state.currentUser;
    return (
      <div>
        <h1>Landing Page</h1>
        <form onSubmit={() => this.onFormSubmit(event, this.state)}>
          <input
            onChange={(event) => this.onInputChange(event, this.state)}
            type="text" placeholder="Enter Name to Chat"
            value={currentUser}
          />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(mapStateToProps, { setCurrentUser })(Landing)
