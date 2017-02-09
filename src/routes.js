import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './client/components/App';
import Landing from './client/components/landingPage';


export default (
  <Route path='/' component={App}>
    <IndexRoute component={Landing} />
    <Route path='channel/messages' component={Channel} />
  </Route>
);
