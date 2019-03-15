import { loginRequest, loginSuccess, loginFailure } from '../../actions/auth';
import { call, put, select } from 'redux-saga/effects';
import { login } from '../../api';
import requestFlow from '../request';
import { fetchLoginSaga } from '../login';

describe('Saga fetchLoginSaga', () => {
  describe('Script with error', () => {
    const action = { payload: { email: '111', password: '111' } };
    const responce = { data: { jwt: 'something' } };
    const saga = fetchLoginSaga(action);

    it('1. Effect call login', () => {
      expect(saga.next().value).toEqual(
        call(requestFlow, login, action.payload)
      );
    });
    it('2. Effect put loginSuccess', () => {
      expect(saga.next(responce).value).toEqual(put(loginSuccess('something')));
    });
  });
  describe('Script without error', () => {
    const action = { payload: { email: '111', password: '111' } };
    const error = { data: 'error' };
    const saga = fetchLoginSaga(action);

    it('1. Effect call login', () => {
      expect(saga.next().value).toEqual(
        call(requestFlow, login, action.payload)
      );
    });
    it('2. Effect put loginFailure', () => {
      expect(saga.throw(error).value).toEqual(put(loginFailure(error.data)));
    });
  });
});
