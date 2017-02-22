import React from 'react';
import ReactDOM from 'react-dom';

// import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'

import configureStore from './client/store/index';
import App from './client/App';

const render = (Component) => {
  ReactDOM.render(
    <Provider store={configureStore()}>
      <Component />
    </Provider>,
    document.getElementById('root')
  );
}

render(App)

module.hot.accept('./client/App', () => {
  render(App)
})
