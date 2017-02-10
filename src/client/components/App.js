import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Landing from './landingPage';

class App extends Component {
  render () {
  return (
    <div>
    <Router>
      <div>
        <ul>
          <li><Link to="/poop">Home</Link></li>
        </ul>
        <hr/>
        <Route path="/" component={Landing} />
      </div>
    </Router>
    </div>
  )
  }
}

export default App;
