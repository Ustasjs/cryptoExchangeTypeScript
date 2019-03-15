import { loginRequest, loginSuccess, loginFailure } from '../actions/auth';
import { takeLatest, call, put } from 'redux-saga/effects';
import { login } from '../api';
import requestFlow from './request';

export function* fetchLoginSaga(action) {
  try {
    let response = yield call(requestFlow, login, action.payload);
    yield put(loginSuccess(response.data.jwt));
  } catch (error) {
    yield put(loginFailure(error.data));
  }
}

export function* fetchLoginWatch() {
  yield takeLatest(loginRequest, fetchLoginSaga);
}
