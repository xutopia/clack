import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './landingPage';

const App = () => (
  <div>
    <Router>
      <div>
        <Route path="/" component={Landing} />
      </div>
    </Router>
  </div>
);

export default App;
