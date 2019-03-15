import {
  sellCurrencyRequest,
  sellCurrencySuccess,
  sellCurrencyFailure,
  buyCurrencyRequest,
  buyCurrencySuccess,
  buyCurrencyFailure
} from '../actions/trade';
import { takeEvery, call, put } from 'redux-saga/effects';
import { sellCurrency, buyCurrency } from '../api';

export function* fetchSellCurrencySaga(action) {
  try {
    const currency = action.payload.currency;
    const value = action.payload.value;
    let response = yield call(sellCurrency, currency, value);
    yield put(sellCurrencySuccess(response.data));
  } catch (error) {
    yield put(sellCurrencyFailure(error));
  }
}

export function* fetchBuyCurrencySaga(action) {
  try {
    const currency = action.payload.currency;
    const value = action.payload.value;
    let response = yield call(buyCurrency, currency, value);
    yield put(buyCurrencySuccess(response.data));
  } catch (error) {
    yield put(buyCurrencyFailure(error));
  }
}

export function* fetchSellCurrencyWatch() {
  yield takeEvery(sellCurrencyRequest, fetchSellCurrencySaga);
}

export function* fetchBuyCurrencyWatch() {
  yield takeEvery(buyCurrencyRequest, fetchBuyCurrencySaga);
}
