import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'

export default class Room extends React.Component {
  constructor(props) {
    super(props)
    this.state = { messages: [], name: '' }
  }

  componentWillMount() {
    const name = window.localStorage.getItem('currentUser');
    this.setState({
      name: name,
      messages: [],
    })
  }

  componentDidMount() {
    this.socket = io('/')
    this.socket.on('message', message => {
      this.setState({ messages: [message, ...this.state.messages] })
    })
  }

  // componentWillUnmount() {
  //   socket
  // }

  handleSubmit = (event) => {
    const body = event.target.value;
    if (event.keyCode === 13 && body) {
      const message = {
        body,
        from: this.state.name,
      };
      this.setState({ messages: [message, ...this.state.messages] });
      this.socket.emit('message', body);
      event.target.value = '';
    }
  }

  render () {
    const messages = this.state.messages.map((message, idx) => {
      return <li key={idx}><b>{message.from}: </b>{message.body}</li>
    })
    return (
      <div>
        <h1>CLACK Chat!</h1>
        <input type="text" placeholder='enter a message' onKeyUp={this.handleSubmit}/>
        {messages.reverse()}
        <div>
        </div>
      </div>
    )
  }
}