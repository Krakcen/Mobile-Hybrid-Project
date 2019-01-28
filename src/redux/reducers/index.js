import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import MainReducer from './reducer-main';

export default combineReducers({ MainReducer, form: formReducer });
