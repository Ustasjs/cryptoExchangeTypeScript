import requestFlow from '../request';
import { call, put, select } from 'redux-saga/effects';
import { clearNetworkErrors, setNetworkError } from '../../actions/network';
import { logout } from '../../actions/auth';
import { getIsNetworkErrorPresent } from '../../reducers/network';

describe('Saga requestFlow', () => {
  describe('Without error', () => {
    const mockFn = () => 'response';
    const mockArg = [];
    const saga = requestFlow(mockFn, mockArg);

    it('1. Effect call fn', () => {
      expect(saga.next(true).value).toEqual(call(mockFn, mockArg));
    });
    it('2. Effect select getIsNetworkErrorPresent', () => {
      expect(saga.next().value).toEqual(select(getIsNetworkErrorPresent));
    });
    it('3. Effect put clearNetworkErrors', () => {
      expect(saga.next(true).value).toEqual(put(clearNetworkErrors()));
    });
  });
  describe('With error', () => {
    const mockFn = () => new Error();
    const mockArg = [];
    const saga = requestFlow(mockFn, mockArg);

    it('1. Effect call fn', () => {
      expect(saga.next().value).toEqual(call(mockFn, mockArg));
    });
    it('2. Effect select getIsNetworkErrorPresent', () => {
      expect(saga.next().value).toEqual(select(getIsNetworkErrorPresent));
    });
    it('3. Effect put setNetworkError', () => {
      expect(saga.throw({ response: { status: 401 } }).value).toEqual(
        put(setNetworkError({ status: 401 }))
      );
    });
  });
});
