import {
  take,
  select,
  put,
  cancel,
  call,
  fork,
  delay
} from 'redux-saga/effects';
import { createMockTask } from '@redux-saga/testing-utils';
import { loginSuccess, logout } from '../../actions/auth';
import { getOffset } from '../../reducers/currency';
import {
  selectBtc,
  selectEth,
  fetchBtcRequest,
  fetchEthRequest,
  fetchBtcSuccess,
  fetchBtcFailure,
  fetchEthFailure,
  fetchEthSuccess,
  selectOffset
} from '../../actions/currency';
import { candles } from '../../api';
import { handleInputData } from '../../helpers/dataHandler';
import {
  fetchCurrencyFlow,
  currencyWatch,
  fetchBtcFlow,
  fetchEthFlow
} from '../currency';

describe('Saga fetchCurrencyFlow', () => {
  const saga = fetchCurrencyFlow();
  it('1. Effect select getOffset', () => {
    expect(saga.next().value).toEqual(select(getOffset));
  });
  it('2. Effect put fetchBtcRequest', () => {
    expect(saga.next({ data: 'data' }).value).toEqual(
      put(fetchBtcRequest({ data: 'data' }))
    );
  });
  it('3. Effect put fetchEthRequest', () => {
    expect(saga.next({ data: 'data' }).value).toEqual(
      put(fetchEthRequest({ data: 'data' }))
    );
  });
  it('4. Effect delay 30000', () => {
    expect(saga.next().value).toEqual(delay(30000));
  });
});

describe('Saga currencyWatch', () => {
  const saga = currencyWatch();
  const task = createMockTask();
  it('1. Effect take actions', () => {
    expect(saga.next().value).toEqual(
      take([loginSuccess, logout, selectBtc, selectEth, selectOffset])
    );
  });
  it('2. Effect fork fetchCurrencyFlow', () => {
    expect(saga.next(loginSuccess).value).toEqual(fork(fetchCurrencyFlow));
  });
  it('3. Effect take actions', () => {
    expect(saga.next(task).value).toEqual(
      take([loginSuccess, logout, selectBtc, selectEth, selectOffset])
    );
  });
  it('4. Effect call cancel currencyTask', () => {
    expect(saga.next().value).toEqual(cancel(task));
  });
});

describe('Saga fetchBtcFlow', () => {
  describe('Script without error', () => {
    const saga = fetchBtcFlow(fetchBtcRequest('data'));
    const response = {
      data: {
        result: [
          { mts: 1512916680000, sell: 15117, purchase: 14965.83 },
          { mts: 1512916560000, sell: 15329, purchase: 15176.205 }
        ]
      }
    };
    const result = handleInputData(response);
    it('1. Effect call candles', () => {
      expect(saga.next().value).toEqual(call(candles, 'btc', 'data'));
    });
    it('2. Effect put fetchBtcSuccess', () => {
      expect(saga.next(response).value).toEqual(put(fetchBtcSuccess(result)));
    });
  });

  describe('Script with error', () => {
    const saga = fetchBtcFlow(fetchBtcRequest('data'));
    it('1. Effect call candles', () => {
      expect(saga.next().value).toEqual(call(candles, 'btc', 'data'));
    });
    it('2. Effect put fetchEthFailure', () => {
      expect(saga.throw('error').value).toEqual(put(fetchBtcFailure('error')));
    });
  });
});

describe('Saga fetchEthFlow', () => {
  describe('Script without error', () => {
    const saga = fetchEthFlow(fetchEthRequest('data'));
    const response = {
      data: {
        result: [
          { mts: 1512916680000, sell: 15117, purchase: 14965.83 },
          { mts: 1512916560000, sell: 15329, purchase: 15176.205 }
        ]
      }
    };
    const result = handleInputData(response);
    it('1. Effect call candles', () => {
      expect(saga.next().value).toEqual(call(candles, 'eth', 'data'));
    });
    it('2. Effect put fetchEthSuccess', () => {
      expect(saga.next(response).value).toEqual(put(fetchEthSuccess(result)));
    });
  });

  describe('Script with error', () => {
    const saga = fetchEthFlow(fetchEthRequest('data'));
    it('1. Effect call candles', () => {
      expect(saga.next().value).toEqual(call(candles, 'eth', 'data'));
    });
    it('2. Effect put fetchEthFailure', () => {
      expect(saga.throw('error').value).toEqual(put(fetchEthFailure('error')));
    });
  });
});
