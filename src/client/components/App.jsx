import React from 'react';
import { HashRouter as Router, Match } from 'react-router';
import Landing from './LandingPage';
import Chat from './ChatRoomPage';

const App = () => (
  <div>
    <Router>
      <div>
        <Match exactly pattern="/" component={Landing} />
        <Match exactly pattern="/messages" component={Chat} />
      </div>
    </Router>
  </div>
);

export default App;
