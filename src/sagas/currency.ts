import {
  takeLatest,
  fork,
  take,
  select,
  put,
  cancel,
  call,
  delay
} from 'redux-saga/effects';
import { loginSuccess, logout } from '../actions/auth';
import { getOffset } from '../reducers/currency';
import {
  selectBtc,
  selectEth,
  fetchBtcRequest,
  fetchEthRequest,
  fetchBtcSuccess,
  fetchBtcFailure,
  fetchEthFailure,
  fetchEthSuccess,
  selectOffset,
  IFetchBtcRequest,
  IFetchEthRequest
} from '../actions/currency';
import { candles } from '../api';
import { handleInputData } from '../helpers/dataHandler';
import { IResponce, ICurrency } from '../types';

export function* fetchCurrencyFlow() {
  while (true) {
    const offset: string = yield select(getOffset);
    yield put(fetchBtcRequest(offset));
    yield put(fetchEthRequest(offset));

    yield delay(30000);
  }
}

export function* currencyWatch() {
  let currencyTask;
  while (true) {
    const action = yield take([
      loginSuccess,
      logout,
      selectBtc,
      selectEth,
      selectOffset
    ]);

    if (currencyTask) {
      yield cancel(currencyTask);
      currencyTask = undefined;
    }
    if (action.type !== logout.toString())
      currencyTask = yield fork(fetchCurrencyFlow);
  }
}

export function* fetchBtcFlow(action: IFetchBtcRequest) {
  try {
    const response: IResponce = yield call(candles, 'btc', action.payload);
    const result: ICurrency = handleInputData(response);
    yield put(fetchBtcSuccess(result));
  } catch (error) {
    yield put(fetchBtcFailure(error));
  }
}

export function* fetchEthFlow(action: IFetchEthRequest) {
  try {
    const response: IResponce = yield call(candles, 'eth', action.payload);
    const result: ICurrency = handleInputData(response);
    yield put(fetchEthSuccess(result));
  } catch (error) {
    yield put(fetchEthFailure(error));
  }
}

export function* fetchBtcWatch() {
  yield takeLatest(fetchBtcRequest, fetchBtcFlow);
}

export function* fetchEthWatch() {
  yield takeLatest(fetchEthRequest, fetchEthFlow);
}
