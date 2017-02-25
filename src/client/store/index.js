import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reducer from '../reducers/index';
import saga from '../sagas/index';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware, logger()),
    )
  );
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index')
      store.replaceReducer(nextRootReducer)
    })
  }
  sagaMiddleware.run(saga);
  return store;
}
