import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Landing from './landingPage';

const App = () => {
  console.log('hi');
  return (
    <div>
      <Router>
        <div>
          <Route path="/" component={Landing} />
        </div>
      </Router>
    </div>
  );
};

export default App;
