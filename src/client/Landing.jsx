import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react'
import Welcome from './components/Welcome.jsx';

import { login, doubleNameError } from './actions/actions'
// import Background from './images/typewriter_smallkb.jpg';

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
      event.preventDefault()
      window.localStorage.setItem('currentUser', username);
      this.props.dispatch(login({ username }))
      this.context.router.push('/room');
  }
  render() {
    const { currentUser } = this.state.currentUser;
    // const backgroundStyle = {
    //   height:'400px',
    //   width: '100%',
    //   background: 'url(' + './images/typewriter_smallkb.jpg' + ')' + 'no-repeat center center',
    //   position: 'relative'
    // }

    return (
      <div>
        <h1>Welcome!!!</h1>
        <Welcome
          speed={88}
          tag="pre"
          text={["What is your name?",
          "Please enter your name!",
          "We want your name!",
          "Name?",
          "Name please!"]}
          randomSpeed={true}/>
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
