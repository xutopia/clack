import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Divider } from 'semantic-ui-react'
import TypeWriter from 'react-typewriter';

import { login, doubleNameError } from './actions/actions'
// import Background from './images/typewriter_smallkb.jpg';

class Landing extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: '',
      typing: 1,
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

  alternateTyping(state) {
    setTimeout(() => {
      if(state.typing === 1) {
        this.setState({
          ...state,
          typing: -1,
        })
      } else {
        this.setState({
          ...state,
          typing: 1,
        })
      }
    }, 1500);
    clearTimeout();
  }

  render() {
    const { currentUser } = this.state.currentUser;
    const landingStyle = {
      position: 'absolute',
      top: '400px',
      right: '200px',
      bottom: '100px',
      left: '200px',
      width: '75%',
    }

    const titleStyle = {
      fontSize: '400%',
      width: '40%',
      margin: '0 auto',
    }

    const inputStyle = {
      width: '50%',
      margin: '0 auto',
    }

    const typewriterStyle = {
      width: '34%',
      margin: '0 auto',
    }

    const githubStyle = {
      margin: '0 auto',
      bottom: '0px',
      right: '800px',
      position: 'fixed',
    }
    return (
      <div style={landingStyle}>
        <h1 style={titleStyle}>Welcome to Clack!</h1>
        <h2 style={typewriterStyle}>
          <TypeWriter
            typing={this.state.typing}
            onTypingEnd={() => this.alternateTyping(this.state)}
            initDelay={3000}
            minDelay={50}
            maxDelay={300}
            fixed={true}
          >
            Please enter a name to start chatting!
          </TypeWriter>
        </h2>
        <Divider hidden />
        <Form style={inputStyle} onSubmit={(event) => this.onFormSubmit(event, this.state)}>
          <Form.Field>
            <input
            onChange={(event) => this.onInputChange(event, this.state)}
            type="text" placeholder="Enter Name to Chat"
            value={currentUser}
            />
          </Form.Field>
        </Form>
        <div style={githubStyle}>
          <a target="_blank" href="http://www.github.com/asyncapes/clack">
          <img src={"http://www.bryanbowie.info/images/GitHub-Mark-120px-plus.png"} style={{height:"3em"}} /></a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ app }) => {
  return { app };
}

export default connect(mapStateToProps)(Landing)
