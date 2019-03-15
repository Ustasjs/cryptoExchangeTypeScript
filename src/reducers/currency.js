import {
  selectBtc,
  selectEth,
  selectOffset,
  fetchBtcRequest,
  fetchEthRequest,
  fetchBtcSuccess,
  fetchBtcFailure,
  fetchEthFailure,
  fetchEthSuccess
} from '../actions/currency';
import { logout } from '../actions/auth';
import { handleActions } from 'redux-actions';

const initState = {
  selected: 'btc',
  offset: '2h',
  btc: [],
  eth: [],
  btcLoadingState: {
    isLoading: false,
    isLoaded: false,
    error: false
  },
  ethLoadingState: {
    isLoading: false,
    isLoaded: false,
    error: false
  }
};

export const currency = handleActions(
  {
    [selectBtc]: (state, action) => ({
      ...state,
      selected: 'btc'
    }),
    [selectEth]: (state, action) => ({
      ...state,
      selected: 'eth'
    }),
    [selectOffset]: (state, action) => ({
      ...state,
      offset: action.payload
    }),
    [fetchBtcRequest]: (state, action) => ({
      ...state,
      btcLoadingState: { isLoading: true, isLoaded: false, error: false }
    }),
    [fetchBtcSuccess]: (state, action) => ({
      ...state,
      btc: action.payload,
      btcLoadingState: { isLoading: false, isLoaded: true, error: false }
    }),
    [fetchBtcFailure]: (state, action) => ({
      ...state,
      btcLoadingState: { isLoading: false, isLoaded: true, error: action.error }
    }),
    [fetchEthRequest]: (state, action) => ({
      ...state,
      ethLoadingState: { isLoading: true, isLoaded: false, error: false }
    }),
    [fetchEthSuccess]: (state, action) => ({
      ...state,
      eth: action.payload,
      ethLoadingState: { isLoading: false, isLoaded: true, error: false }
    }),
    [fetchEthFailure]: (state, action) => ({
      ...state,
      ethLoadingState: { isLoading: false, isLoaded: true, error: action.error }
    }),
    [logout]: (state, action) => ({ ...initState })
  },
  initState
);

export const getOffset = state => state.currency.offset;
export const getSelected = state => state.currency.selected;
export const getBtc = state => state.currency.btc;
export const getEth = state => state.currency.eth;
export const getBtcLoadingState = state => state.currency.btcLoadingState;
export const getEthLoadingState = state => state.currency.ethLoadingState;
