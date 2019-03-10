import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import reducer from './reducers/login-reducer';

export default createStore(reducer, applyMiddleware(logger));
