import {
  registrationRequest,
  registrationSuccess,
  registrationFailure
} from '../actions/auth';
import { takeLatest, call, put } from 'redux-saga/effects';
import { registration } from '../api';
import requestFlow from '../sagas/request';

export function* fetchRegistrationSaga(action) {
  try {
    let response = yield call(requestFlow, registration, action.payload);
    yield put(registrationSuccess(response.data.jwt));
  } catch (error) {
    yield put(registrationFailure(error.data));
  }
}

export function* fetchRegistrationWatch() {
  yield takeLatest(registrationRequest, fetchRegistrationSaga);
}
