import {
  userInformationSuccess,
  userInformationFailure,
  userWalletSuccess,
  userWalletFailure
} from '../actions/user';
import {
  sellCurrencySuccess,
  sellCurrencyFailure,
  buyCurrencySuccess,
  buyCurrencyFailure
} from '../actions/trade';
import { logout } from '../actions/auth';
import { parseCurrency } from '../helpers/dataHandler';
import { handleActions } from 'redux-actions';
import { IStore } from '../types';

export interface IUserState {
  userInfo: {
    email: string;
  };
  userInfoError: string | boolean;
  wallet: {
    usd: number;
    btc: number;
    eth: number;
  };
  walletError: string | boolean;
  errorSell: string | boolean;
  errorBuy: string | boolean;
}

const initState = {
  userInfo: {
    email: ''
  },
  userInfoError: false,
  wallet: {
    usd: 0,
    btc: 0,
    eth: 0
  },
  walletError: false,
  errorSell: false,
  errorBuy: false
};

export const user = handleActions<IUserState, any>(
  {
    [userInformationSuccess.toString()]: (state, action) => ({
      ...state,
      userInfo: action.payload,
      userInfoError: false
    }),
    [userWalletSuccess.toString()]: (state, action) => ({
      ...state,
      wallet: action.payload,
      walletError: false
    }),
    [userInformationFailure.toString()]: (state, action) => ({
      ...state,
      userInfoError: action.error ? action.error : false
    }),
    [userWalletFailure.toString()]: (state, action) => ({
      ...state,
      walletError: action.error ? action.error : false
    }),
    [sellCurrencySuccess.toString()]: (state, action) => ({
      ...state,
      errorSell: false,
      errorBuy: false,
      wallet: {
        usd: action.payload.usd,
        btc: action.payload.btc,
        eth: action.payload.eth
      }
    }),
    [sellCurrencyFailure.toString()]: (state, action) => ({
      ...state,
      errorSell: action.payload
    }),
    [buyCurrencySuccess.toString()]: (state, action) => ({
      ...state,
      errorSell: false,
      errorBuy: false,
      wallet: {
        usd: action.payload.usd,
        btc: action.payload.btc,
        eth: action.payload.eth
      }
    }),
    [buyCurrencyFailure.toString()]: (state, action) => ({
      ...state,
      errorBuy: action.payload
    }),
    [logout.toString()]: () => ({ ...initState })
  },
  initState
);

export const getUserEmail = (state: IStore) => state.user.userInfo.email;
export const getErrorSell = (state: IStore) => state.user.errorSell;
export const getErrorBuy = (state: IStore) => state.user.errorBuy;
export const getWallet = (state: IStore) => state.user.wallet;
export const getParsedUsd = (state: IStore) =>
  parseCurrency(state.user.wallet.usd);
export const getParsedBtc = (state: IStore) =>
  parseCurrency(state.user.wallet.btc);
export const getParsedEth = (state: IStore) =>
  parseCurrency(state.user.wallet.eth);
