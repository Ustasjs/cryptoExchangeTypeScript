import { loginSuccess, registrationSuccess } from '../../actions/auth';
import {
  userInformationSuccess,
  userInformationFailure,
  userWalletSuccess,
  userWalletFailure
} from '../../actions/user';
import { takeLatest, call, put } from 'redux-saga/effects';
import { getWallet, getUserInfo } from '../../api';
import requestFlow from '../request';
import { fetchUserInfo, fetchUserWallet } from '../user';

describe('Safa fetchUserInfo', () => {
  describe('Script without error', () => {
    const saga = fetchUserInfo();
    const response = { data: { result: 'result' } };
    it('1. Effect call requestFlow(getUserInfo)', () => {
      expect(saga.next().value).toEqual(call(requestFlow, getUserInfo));
    });
    it('2. Effect put userInformationSuccess', () => {
      expect(saga.next(response).value).toEqual(
        put(userInformationSuccess('result'))
      );
    });
  });
  describe('Script without error', () => {
    const saga = fetchUserInfo();
    const response = { data: { result: 'result' } };
    it('1. Effect call requestFlow(getUserInfo)', () => {
      expect(saga.next().value).toEqual(call(requestFlow, getUserInfo));
    });
    it('2. Effect put userInformationFailure', () => {
      expect(saga.throw({ data: 'error' }).value).toEqual(
        put(userInformationFailure('error'))
      );
    });
  });
});

describe('Safa fetchUserWallet', () => {
  describe('Script without error', () => {
    const saga = fetchUserWallet();
    const response = { data: { result: 'result' } };
    it('1. Effect call requestFlow(getWallet)', () => {
      expect(saga.next().value).toEqual(call(requestFlow, getWallet));
    });
    it('2. Effect put userWalletSuccess', () => {
      expect(saga.next(response).value).toEqual(
        put(userWalletSuccess('result'))
      );
    });
  });
  describe('Script without error', () => {
    const saga = fetchUserWallet();
    const response = { data: { result: 'result' } };
    it('1. Effect call requestFlow(getWallet)', () => {
      expect(saga.next().value).toEqual(call(requestFlow, getWallet));
    });
    it('2. Effect put userWalletFailure', () => {
      expect(saga.throw({ data: 'error' }).value).toEqual(
        put(userWalletFailure('error'))
      );
    });
  });
});
