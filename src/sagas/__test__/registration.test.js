import {
  registrationRequest,
  registrationSuccess,
  registrationFailure
} from '../../actions/auth';
import { takeLatest, call, put } from 'redux-saga/effects';
import { registration } from '../../api';
import requestFlow from '../request';
import { fetchRegistrationSaga } from '../registration';

describe('Saga fetchRegistrationSaga', () => {
  describe('Script with error', () => {
    const action = { payload: { email: '111', password: '111' } };
    const responce = { data: { jwt: 'something' } };
    const saga = fetchRegistrationSaga(action);

    it('1. Effect call registration', () => {
      expect(saga.next().value).toEqual(
        call(requestFlow, registration, action.payload)
      );
    });
    it('2. Effect put registrationSuccess', () => {
      expect(saga.next(responce).value).toEqual(
        put(registrationSuccess('something'))
      );
    });
  });
  describe('Script without error', () => {
    const action = { payload: { email: '111', password: '111' } };
    const error = { data: 'error' };
    const saga = fetchRegistrationSaga(action);

    it('1. Effect call registration', () => {
      expect(saga.next().value).toEqual(
        call(requestFlow, registration, action.payload)
      );
    });
    it('2. Effect put registrationFailure', () => {
      expect(saga.throw(error).value).toEqual(
        put(registrationFailure(error.data))
      );
    });
  });
});
