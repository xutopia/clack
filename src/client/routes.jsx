import React, { Component } from 'react';
import { HashRouter, Match } from 'react-router';
import App from './App';
import Landing from './Landing';

export default class Route extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Match exactly pattern="/" component={Landing} />
          <Match exactly pattern="/messages" component={App} />
        </div>
      </HashRouter>
    );
  }
}
