import { createActions } from 'redux-actions';

export const {
  sellCurrencyRequest,
  sellCurrencySuccess,
  sellCurrencyFailure
} = createActions(
  'SELL_CURRENCY_REQUEST',
  'SELL_CURRENCY_SUCCESS',
  'SELL_CURRENCY_FAILURE'
);

export const {
  buyCurrencyRequest,
  buyCurrencySuccess,
  buyCurrencyFailure
} = createActions(
  'BUY_CURRENCY_REQUEST',
  'BUY_CURRENCY_SUCCESS',
  'BUY_CURRENCY_FAILURE'
);
