import { setNetworkError, clearNetworkErrors } from '../actions/network';
import { handleActions } from 'redux-actions';
import { IStore } from '../types';

const initialState = null;
export type NetworkState = null | string;

export const networkError = handleActions<NetworkState, string>(
  {
    [setNetworkError.toString()]: (state, action) =>
      action.payload ? action.payload : null,
    [clearNetworkErrors.toString()]: () => null
  },
  initialState
);

export const getIsNetworkErrorPresent = (state: IStore) =>
  state.networkError != null;
export const getNetworkError = (state: IStore) => state.networkError;
