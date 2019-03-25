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
import { ILoadingState, ICurrency } from '../types';
import { IStore } from '../types';

export interface ICurrencyState {
  selected: string;
  offset: string;
  btc: ICurrency;
  eth: ICurrency;
  btcLoadingState: ILoadingState;
  ethLoadingState: ILoadingState;
}

const initState = {
  selected: 'btc',
  offset: '2h',
  btc: {
    currentPurchasePrice: 0,
    currentSellPrice: 0,
    data: [],
    max: '0',
    min: '0',
    purchase: [],
    sell: []
  },
  eth: {
    currentPurchasePrice: 0,
    currentSellPrice: 0,
    data: [],
    max: '0',
    min: '0',
    purchase: [],
    sell: []
  },
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

export const currency = handleActions<ICurrencyState, any>(
  {
    [selectBtc.toString()]: state => ({
      ...state,
      selected: 'btc'
    }),
    [selectEth.toString()]: state => ({
      ...state,
      selected: 'eth'
    }),
    [selectOffset.toString()]: (state, action) => ({
      ...state,
      offset: action.payload
    }),
    [fetchBtcRequest.toString()]: state => ({
      ...state,
      btcLoadingState: { isLoading: true, isLoaded: false, error: false }
    }),
    [fetchBtcSuccess.toString()]: (state, action) => ({
      ...state,
      btc: action.payload,
      btcLoadingState: { isLoading: false, isLoaded: true, error: false }
    }),
    [fetchBtcFailure.toString()]: (state, action) => ({
      ...state,
      btcLoadingState: { isLoading: false, isLoaded: true, error: action.error }
    }),
    [fetchEthRequest.toString()]: state => ({
      ...state,
      ethLoadingState: { isLoading: true, isLoaded: false, error: false }
    }),
    [fetchEthSuccess.toString()]: (state, action) => ({
      ...state,
      eth: action.payload,
      ethLoadingState: { isLoading: false, isLoaded: true, error: false }
    }),
    [fetchEthFailure.toString()]: (state, action) => ({
      ...state,
      ethLoadingState: { isLoading: false, isLoaded: true, error: action.error }
    }),
    [logout.toString()]: () => ({ ...initState })
  },
  initState
);

export const getOffset = (state: IStore) => state.currency.offset;
export const getSelected = (state: IStore) => state.currency.selected;
export const getBtc = (state: IStore) => state.currency.btc;
export const getEth = (state: IStore) => state.currency.eth;
export const getBtcLoadingState = (state: IStore) =>
  state.currency.btcLoadingState;
export const getEthLoadingState = (state: IStore) =>
  state.currency.ethLoadingState;
