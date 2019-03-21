import { createActions } from 'redux-actions';

export const { setNetworkError, clearNetworkErrors } = createActions(
  'SET_NETWORK_ERROR',
  'CLEAR_NETWORK_ERRORS'
);
