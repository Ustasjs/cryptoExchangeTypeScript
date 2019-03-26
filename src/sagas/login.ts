import {
  loginRequest,
  loginSuccess,
  loginFailure,
  ILoginRequest
} from '../actions/auth';
import { takeLatest, call, put } from 'redux-saga/effects';
import { login } from '../api';
import requestFlow from './request';
import { IAuthResponse } from '../types';

export function* fetchLoginSaga(action: ILoginRequest) {
  try {
    const response: IAuthResponse = yield call(
      requestFlow,
      login,
      action.payload
    );
    yield put(loginSuccess(response.data.jwt));
  } catch (error) {
    yield put(loginFailure(error.data));
  }
}

export function* fetchLoginWatch() {
  yield takeLatest(loginRequest, fetchLoginSaga);
}
