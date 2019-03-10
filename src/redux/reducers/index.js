import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import MainReducer from './reducer-main';
import LoginReducer from './login-reducer';


export default combineReducers({ MainReducer, form: formReducer, login: LoginReducer });
