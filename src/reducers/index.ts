import { combineReducers } from 'redux';
import { auth } from './auth';
import { currency } from './currency';
import { networkError } from './network';
import { user } from './user';
import { IStore } from '../types';

export default combineReducers<IStore | any>({
  auth,
  currency,
  networkError,
  user
});
