import { take, put, call, select } from 'redux-saga/effects';
import { registrationSuccess, loginSuccess, logout } from '../actions/auth';
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage
} from '../localStorage';
import { getIsAuthorized } from '../reducers/auth';
import { setTokenApi, clearTokenApi } from '../api';

export function* authFlow() {
  while (true) {
    const isAuthorized = yield select(getIsAuthorized);
    const localStorageToken = yield call(getTokenFromLocalStorage);
    let token;

    if (!isAuthorized) {
      if (localStorageToken) {
        token = localStorageToken;
        yield call(setTokenApi, token);
        yield put(loginSuccess(token));
      } else {
        const action = yield take([loginSuccess, registrationSuccess]);
        token = action.payload;
      }
    }

    yield call(setTokenApi, token);
    yield call(setTokenToLocalStorage, token);
    yield take(logout);
    yield call(removeTokenFromLocalStorage);
    yield call(clearTokenApi);
  }
}
