import { combineReducers } from 'redux';
import auth from './auth';
import { currency } from './currency';
import { networkError } from './network';
import { user } from './user';

export default combineReducers({ auth, currency, networkError, user });
