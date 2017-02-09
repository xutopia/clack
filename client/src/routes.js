import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from '../components/App';


export default (
  <Route path='/' component={App}>
    <IndexRoute component={Landing} />
    <Route path='channel/messages' component={Channel} />
  </Route>
);
