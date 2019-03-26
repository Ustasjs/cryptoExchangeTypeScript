import {
  userInformationRequest,
  userInformationSuccess,
  userInformationFailure,
  userWalletRequest,
  userWalletSuccess,
  userWalletFailure
} from '../actions/user';
import { takeLatest, call, put } from 'redux-saga/effects';
import { getWallet, getUserInfo } from '../api';
import requestFlow from './request';

interface IUserWalletResponse {
  data: {
    result: {
      btc: number;
      eth: number;
      usd: number;
    };
  };
}

interface IUserInfoResponse {
  data: {
    result: {
      email: string;
    };
  };
}

export function* fetchUserInfo() {
  try {
    const response: IUserInfoResponse = yield call(requestFlow, getUserInfo);
    yield put(userInformationSuccess(response.data.result));
  } catch (error) {
    yield put(userInformationFailure(error.data));
  }
}
export function* fetchUserWallet() {
  try {
    const response: IUserWalletResponse = yield call(requestFlow, getWallet);
    yield put(userWalletSuccess(response.data.result));
  } catch (error) {
    yield put(userWalletFailure(error.data));
  }
}

export function* fetchUserWatch() {
  yield takeLatest(userInformationRequest, fetchUserInfo);
  yield takeLatest(userWalletRequest, fetchUserWallet);
}
