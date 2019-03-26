import { select, call, take, put } from 'redux-saga/effects';
import { authFlow } from '../auth';
import { registrationSuccess, loginSuccess, logout } from '../../actions/auth';
import { userInformationRequest, userWalletRequest } from '../../actions/user';
import { getIsAuthorized } from '../../reducers/auth';
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage
} from '../../localStorage';
import { setTokenApi, clearTokenApi } from '../../api';

describe('Saga authFlow', () => {
  describe('Script without token in localstorage', () => {
    const saga = authFlow();
    const token = 123;
    it('1. Effect select getIsAuthorized', () => {
      expect(saga.next().value).toEqual(select(getIsAuthorized));
    });

    it('2. Effect call getTokenFromLocalStorage', () => {
      expect(saga.next().value).toEqual(call(getTokenFromLocalStorage));
    });

    it('3. Effect take with await loginSuccess or registrationSuccess', () => {
      expect(saga.next().value).toEqual(
        take([loginSuccess, registrationSuccess])
      );
    });

    it('4. Effect call(setTokenApi, token) token from previous step', () => {
      expect(saga.next({ payload: token }).value).toEqual(
        call(setTokenApi, token)
      );
    });

    it('5. Effect call setTokenToLocalStorage', () => {
      expect(saga.next().value).toEqual(call(setTokenToLocalStorage, token));
    });

    it('6. Effect put userInformationRequest', () => {
      expect(saga.next().value).toEqual(put(userInformationRequest()));
    });

    it('7. Effect put userWalletRequest', () => {
      expect(saga.next().value).toEqual(put(userWalletRequest()));
    });

    it('8. Effect take logout', () => {
      expect(saga.next().value).toEqual(take(logout));
    });

    it('9. Effect call removeTokenFromLocalStorage', () => {
      expect(saga.next().value).toEqual(call(removeTokenFromLocalStorage));
    });

    it('10. Effect call clearTokenApi', () => {
      expect(saga.next().value).toEqual(call(clearTokenApi));
    });
  });

  describe('Script with token in localstorage', () => {
    const saga = authFlow();
    const token = 123;

    it('1. Effect select getIsAuthorized', () => {
      expect(saga.next().value).toEqual(select(getIsAuthorized));
    });

    it('2. Effect call getTokenFromLocalStorage', () => {
      expect(saga.next(false).value).toEqual(call(getTokenFromLocalStorage));
    });

    it('3. Effect call setTokenApi', () => {
      expect(saga.next(token).value).toEqual(call(setTokenApi, token));
    });

    it('4. Effect put loginSuccess(token)', () => {
      expect(saga.next(token).value).toEqual(put(loginSuccess(token)));
    });

    it('5. Effect call(setTokenApi, token) token from localStorage', () => {
      expect(saga.next().value).toEqual(call(setTokenApi, token));
    });

    it('6. Effect call setTokenToLocalStorage', () => {
      expect(saga.next().value).toEqual(call(setTokenToLocalStorage, token));
    });

    it('7. Effect put userInformationRequest', () => {
      expect(saga.next().value).toEqual(put(userInformationRequest()));
    });

    it('8. Effect put userWalletRequest', () => {
      expect(saga.next().value).toEqual(put(userWalletRequest()));
    });

    it('9. Effect take logout', () => {
      expect(saga.next().value).toEqual(take(logout));
    });

    it('10. Effect call removeTokenFromLocalStorage', () => {
      expect(saga.next().value).toEqual(call(removeTokenFromLocalStorage));
    });

    it('11. Effect call clearTokenApi', () => {
      expect(saga.next().value).toEqual(call(clearTokenApi));
    });
  });
});
