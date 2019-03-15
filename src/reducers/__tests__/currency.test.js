import {
  selectBtc,
  selectEth,
  selectOffset,
  fetchBtcRequest,
  fetchEthRequest,
  fetchBtcSuccess,
  fetchBtcFailure,
  fetchEthFailure,
  fetchEthSuccess
} from '../../actions/currency';

import { currency } from '../currency';
const initState = {
  selected: 'btc',
  offset: '2h',
  btc: [],
  eth: [],
  btcLoadingState: {
    isLoading: false,
    isLoaded: false,
    error: false
  },
  ethLoadingState: {
    isLoading: false,
    isLoaded: false,
    error: false
  }
};

describe('currency reducer', () => {
  describe('selectBtc action', () => {
    it('shouldn`t mutate init state', () => {
      expect(currency(initState, selectBtc())).not.toBe(initState);
    });
    it('should put btc to selected field', () => {
      expect(currency(null, selectBtc('btc')).selected).toBe('btc');
    });
  });
  describe('selectEth action', () => {
    it('shouldn`t mutate init state', () => {
      expect(currency(initState, selectEth())).not.toBe(initState);
    });
    it('should put eth to selected field', () => {
      expect(currency(null, selectEth('eth')).selected).toBe('eth');
    });
  });
  describe('selectOffset action', () => {
    it('shouldn`t mutate init state', () => {
      expect(currency(initState, selectOffset())).not.toBe(initState);
    });
    it('should put action.payload to offset field', () => {
      expect(currency(null, selectOffset('data')).offset).toBe('data');
    });
  });
  describe('fetchBtcRequest action', () => {
    it('shouldn`t mutate init state', () => {
      expect(currency(initState, fetchBtcRequest())).not.toBe(initState);
    });
    it('shouldn`t mutate init btcLoadingState object', () => {
      expect(currency(initState, fetchBtcRequest()).btcLoadingState).not.toBe(
        initState.btcLoadingState
      );
    });
    it('should set true to btcLoadingState.isLoading field', () => {
      initState.btcLoadingState.isLoading = false;
      expect(
        currency(initState, fetchBtcRequest()).btcLoadingState.isLoading
      ).toBe(true);
    });
    it('should set false to btcLoadingState.isLoaded field', () => {
      initState.btcLoadingState.isLoaded = true;
      expect(
        currency(initState, fetchBtcRequest()).btcLoadingState.isLoaded
      ).toBe(false);
    });
    it('should set false to btcLoadingState.error field', () => {
      initState.btcLoadingState.error = true;
      expect(currency(initState, fetchBtcRequest()).btcLoadingState.error).toBe(
        false
      );
    });
  });
  describe('fetchBtcSuccess action', () => {
    it('shouldn`t mutate init state', () => {
      expect(currency(initState, fetchBtcSuccess())).not.toBe(initState);
    });
    it('shouldn`t mutate init btcLoadingState object', () => {
      expect(currency(initState, fetchBtcSuccess()).btcLoadingState).not.toBe(
        initState.btcLoadingState
      );
    });
    it('should set false to btcLoadingState.isLoading field', () => {
      initState.btcLoadingState.isLoading = true;
      expect(
        currency(initState, fetchBtcSuccess()).btcLoadingState.isLoading
      ).toBe(false);
    });
    it('should set true to btcLoadingState.isLoaded field', () => {
      initState.btcLoadingState.isLoaded = false;
      expect(
        currency(initState, fetchBtcSuccess()).btcLoadingState.isLoaded
      ).toBe(true);
    });
    it('should set false to btcLoadingState.error field', () => {
      initState.btcLoadingState.error = true;
      expect(currency(initState, fetchBtcSuccess()).btcLoadingState.error).toBe(
        false
      );
    });
    it('should put action.payload to btc field', () => {
      expect(currency(initState, fetchBtcSuccess('data')).btc).toBe('data');
    });
  });
  describe('fetchBtcFailure action', () => {
    it('shouldn`t mutate init state', () => {
      expect(currency(initState, fetchBtcFailure())).not.toBe(initState);
    });
    it('shouldn`t mutate init btcLoadingState object', () => {
      expect(currency(initState, fetchBtcFailure()).btcLoadingState).not.toBe(
        initState.btcLoadingState
      );
    });
    it('should set false to btcLoadingState.isLoading field', () => {
      initState.btcLoadingState.isLoading = true;
      expect(
        currency(initState, fetchBtcFailure()).btcLoadingState.isLoading
      ).toBe(false);
    });
    it('should set true to btcLoadingState.isLoaded field', () => {
      initState.btcLoadingState.isLoaded = false;
      expect(
        currency(initState, fetchBtcFailure()).btcLoadingState.isLoaded
      ).toBe(true);
    });
    it('should put action.error to btcLoadingState.error field', () => {
      initState.btcLoadingState.error = false;
      expect(
        currency(initState, fetchBtcFailure(new Error())).btcLoadingState.error
      ).toBe(true);
    });
  });

  describe('fetchEthRequest action', () => {
    it('shouldn`t mutate init state', () => {
      expect(currency(initState, fetchEthRequest())).not.toBe(initState);
    });
    it('shouldn`t mutate init ethLoadingState object', () => {
      expect(currency(initState, fetchEthRequest()).ethLoadingState).not.toBe(
        initState.ethLoadingState
      );
    });
    it('should set true to ethLoadingState.isLoading field', () => {
      initState.ethLoadingState.isLoading = false;
      expect(
        currency(initState, fetchEthRequest()).ethLoadingState.isLoading
      ).toBe(true);
    });
    it('should set false to ethLoadingState.isLoaded field', () => {
      initState.ethLoadingState.isLoaded = true;
      expect(
        currency(initState, fetchEthRequest()).ethLoadingState.isLoaded
      ).toBe(false);
    });
    it('should set false to ethLoadingState.error field', () => {
      initState.ethLoadingState.error = true;
      expect(currency(initState, fetchEthRequest()).ethLoadingState.error).toBe(
        false
      );
    });
  });

  describe('fetchEthSuccess action', () => {
    it('shouldn`t mutate init state', () => {
      expect(currency(initState, fetchEthSuccess())).not.toBe(initState);
    });
    it('shouldn`t mutate init ethLoadingState object', () => {
      expect(currency(initState, fetchEthSuccess()).ethLoadingState).not.toBe(
        initState.ethLoadingState
      );
    });
    it('should set false to ethLoadingState.isLoading field', () => {
      initState.btcLoadingState.isLoading = true;
      expect(
        currency(initState, fetchEthSuccess()).ethLoadingState.isLoading
      ).toBe(false);
    });
    it('should set true to ethLoadingState.isLoaded field', () => {
      initState.ethLoadingState.isLoaded = false;
      expect(
        currency(initState, fetchEthSuccess()).ethLoadingState.isLoaded
      ).toBe(true);
    });
    it('should set false to ethLoadingState.error field', () => {
      initState.ethLoadingState.error = true;
      expect(currency(initState, fetchEthSuccess()).ethLoadingState.error).toBe(
        false
      );
    });
    it('should put action.payload to eth field', () => {
      expect(currency(initState, fetchEthSuccess('data')).eth).toBe('data');
    });
  });

  describe('fetchEthFailure action', () => {
    it('shouldn`t mutate init state', () => {
      expect(currency(initState, fetchEthFailure())).not.toBe(initState);
    });
    it('shouldn`t mutate init ethLoadingState object', () => {
      expect(currency(initState, fetchEthFailure()).ethLoadingState).not.toBe(
        initState.ethLoadingState
      );
    });
    it('should set false to ethLoadingState.isLoading field', () => {
      initState.ethLoadingState.isLoading = true;
      expect(
        currency(initState, fetchEthFailure()).ethLoadingState.isLoading
      ).toBe(false);
    });
    it('should set true to ethLoadingState.isLoaded field', () => {
      initState.ethLoadingState.isLoaded = false;
      expect(
        currency(initState, fetchEthFailure()).ethLoadingState.isLoaded
      ).toBe(true);
    });
    it('should put action.error to ethLoadingState.error field', () => {
      initState.ethLoadingState.error = false;
      expect(
        currency(initState, fetchEthFailure(new Error())).ethLoadingState.error
      ).toBe(true);
    });
  });
});
