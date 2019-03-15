import {
  sellCurrencyRequest,
  sellCurrencySuccess,
  sellCurrencyFailure,
  buyCurrencyRequest,
  buyCurrencySuccess,
  buyCurrencyFailure
} from '../../actions/trade';
import { call, put } from 'redux-saga/effects';
import { sellCurrency, buyCurrency } from '../../api';
import { fetchSellCurrencySaga, fetchBuyCurrencySaga } from '../trade';

describe('Saga fetchSellCurrencySaga', () => {
  describe('Script without error', () => {
    const action = { payload: { currency: 'btc', value: 1000 } };
    const saga = fetchSellCurrencySaga(action);
    it('1. Effect call sellCurrency', () => {
      expect(saga.next().value).toEqual(
        call(sellCurrency, action.payload.currency, action.payload.value)
      );
    });
    it('2. Effect put sellCurrencySuccess', () => {
      expect(saga.next({ data: 'data' }).value).toEqual(
        put(sellCurrencySuccess('data'))
      );
    });
  });

  describe('Script with error', () => {
    const action = { payload: { currency: 'btc', value: 1000 } };
    const saga = fetchSellCurrencySaga(action);
    it('1. Effect call sellCurrency', () => {
      expect(saga.next().value).toEqual(
        call(sellCurrency, action.payload.currency, action.payload.value)
      );
    });
    it('2. Effect put sellCurrencyFailure', () => {
      expect(saga.throw({ error: 'error' }).value).toEqual(
        put(sellCurrencyFailure({ error: 'error' }))
      );
    });
  });
});

describe('Saga fetchBuyCurrencySaga', () => {
  describe('Script without error', () => {
    const action = { payload: { currency: 'btc', value: 1000 } };
    const saga = fetchBuyCurrencySaga(action);
    it('1. Effect call buyCurrency', () => {
      expect(saga.next().value).toEqual(
        call(buyCurrency, action.payload.currency, action.payload.value)
      );
    });
    it('2. Effect put buyCurrencySuccess', () => {
      expect(saga.next({ data: 'data' }).value).toEqual(
        put(buyCurrencySuccess('data'))
      );
    });
  });

  describe('Script with error', () => {
    const action = { payload: { currency: 'btc', value: 1000 } };
    const saga = fetchBuyCurrencySaga(action);
    it('1. Effect call buyCurrency', () => {
      expect(saga.next().value).toEqual(
        call(buyCurrency, action.payload.currency, action.payload.value)
      );
    });
    it('2. Effect put buyCurrencyFailure', () => {
      expect(saga.throw({ error: 'error' }).value).toEqual(
        put(buyCurrencyFailure({ error: 'error' }))
      );
    });
  });
});
