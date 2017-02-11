import React from 'react';
import { HashRouter as Router, Match } from 'react-router';
import Landing from './landingPage';

const App = () => (
  <div>
    <Router>
      <div>
        <Match exactly pattern="/" component={Landing} />
      </div>
    </Router>
  </div>
);

export default App;
