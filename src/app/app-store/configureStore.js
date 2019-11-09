import { createStore, compose, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';
import rootEpic from './rootEpic';

const epicMiddleware = createEpicMiddleware();

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk, epicMiddleware),
);

epicMiddleware.run(rootEpic);
