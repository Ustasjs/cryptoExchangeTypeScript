import { createActions } from 'redux-actions';

export const {
  fetchBtcRequest,
  fetchBtcSuccess,
  fetchBtcFailure
} = createActions(
  'FETCH_BTC_REQUEST',
  'FETCH_BTC_SUCCESS',
  'FETCH_BTC_FAILURE'
);

export const {
  fetchEthRequest,
  fetchEthSuccess,
  fetchEthFailure
} = createActions(
  'FETCH_ETH_REQUEST',
  'FETCH_ETH_SUCCESS',
  'FETCH_ETH_FAILURE'
);

export const { selectBtc, selectEth, selectOffset } = createActions(
  'SELECT_BTC',
  'SELECT_ETH',
  'SELECT_OFFSET'
);

export interface IFetchBtcRequest {
  type: 'FETCH_BTC_REQUEST';
  payload: string;
}

export interface IFetchEthRequest {
  type: 'FETCH_ETH_REQUEST';
  payload: string;
}
