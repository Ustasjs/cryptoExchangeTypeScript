import {
  registrationRequest,
  registrationSuccess,
  registrationFailure,
  IRegistrationRequest
} from '../actions/auth';
import { takeLatest, call, put } from 'redux-saga/effects';
import { registration } from '../api';
import requestFlow from '../sagas/request';
import { IAuthResponse } from '../types';

export function* fetchRegistrationSaga(action: IRegistrationRequest) {
  try {
    const response: IAuthResponse = yield call(
      requestFlow,
      registration,
      action.payload
    );
    yield put(registrationSuccess(response.data.jwt));
  } catch (error) {
    yield put(registrationFailure(error.data));
  }
}

export function* fetchRegistrationWatch() {
  yield takeLatest(registrationRequest, fetchRegistrationSaga);
}
