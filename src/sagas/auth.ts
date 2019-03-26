import { take, put, call, select, all } from 'redux-saga/effects';
import { registrationSuccess, loginSuccess, logout } from '../actions/auth';
import { userInformationRequest, userWalletRequest } from '../actions/user';
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage
} from '../localStorage';
import { getIsAuthorized } from '../reducers/auth';
import { setTokenApi, clearTokenApi } from '../api';

export function* authFlow() {
  while (true) {
    const isAuthorized: boolean = yield select(getIsAuthorized);
    const localStorageToken: string | null = yield call(
      getTokenFromLocalStorage
    );
    let token: string = '';

    if (!isAuthorized) {
      if (localStorageToken !== null && localStorageToken !== undefined) {
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
    yield put(userInformationRequest());
    yield put(userWalletRequest());
    yield take(logout);
    yield call(removeTokenFromLocalStorage);
    yield call(clearTokenApi);
  }
}
