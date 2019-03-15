import { setNetworkError, clearNetworkErrors } from '../actions/network';
import { handleActions } from 'redux-actions';

export const networkError = handleActions(
  {
    [setNetworkError]: (state, action) => action.payload,
    [clearNetworkErrors]: () => null
  },
  null
);

export const getIsNetworkErrorPresent = state => state.networkError != null;
export const getNetworkError = state => state.networkError;
