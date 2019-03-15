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

const initState = {
  userInfo: {},
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

export const user = handleActions(
  {
    [userInformationSuccess]: (state, action) => ({
      ...state,
      userInfo: action.payload,
      userInfoError: false
    }),
    [userWalletSuccess]: (state, action) => ({
      ...state,
      wallet: action.payload,
      walletError: false
    }),
    [userInformationFailure]: (state, action) => ({
      ...state,
      userInfoError: action.error
    }),
    [userWalletFailure]: (state, action) => ({
      ...state,
      walletError: action.error
    }),
    [sellCurrencySuccess]: (state, action) => ({
      ...state,
      errorSell: false,
      errorBuy: false,
      wallet: {
        usd: action.payload.usd,
        btc: action.payload.btc,
        eth: action.payload.eth
      }
    }),
    [sellCurrencyFailure]: (state, action) => ({
      ...state,
      errorSell: action.payload
    }),
    [buyCurrencySuccess]: (state, action) => ({
      ...state,
      errorSell: false,
      errorBuy: false,
      wallet: {
        usd: action.payload.usd,
        btc: action.payload.btc,
        eth: action.payload.eth
      }
    }),
    [buyCurrencyFailure]: (state, action) => ({
      ...state,
      errorBuy: action.payload
    }),
    [logout]: (state, action) => ({ ...initState })
  },
  initState
);

export const getUserEmail = state => state.user.userInfo.email;
export const getErrorSell = state => state.user.errorSell;
export const getErrorBuy = state => state.user.errorBuy;
export const getWallet = state => state.user.wallet;
export const getParsedUsd = state => parseCurrency(state.user.wallet.usd);
export const getParsedBtc = state => parseCurrency(state.user.wallet.btc);
export const getParsedEth = state => parseCurrency(state.user.wallet.eth);
