import {
  userInformationSuccess,
  userInformationFailure,
  userWalletSuccess,
  userWalletFailure
} from '../../actions/user';
import {
  sellCurrencySuccess,
  sellCurrencyFailure,
  buyCurrencySuccess,
  buyCurrencyFailure
} from '../../actions/trade';
import { logout } from '../../actions/auth';
import { user } from '../user';

describe('Users reducer', () => {
  const initState = {
    userInfo: {
      email: ''
    },
    userInfoError: false,
    wallet: {
      usd: 0,
      btc: 0,
      eth: 0
    },
    walletError: false,
    errorSell: false,
    errorBuy: false
  };

  describe('userInformationSuccess action', () => {
    it('shouldn`t mutate init state', () => {
      expect(user(initState, userInformationSuccess())).not.toBe(initState);
    });

    it('should add action.payload to userInfo', () => {
      expect(
        user(initState, userInformationSuccess({ name: 'Ivan' })).userInfo
      ).toEqual({ name: 'Ivan' });
    });
    it('should set false to userInfoError field', () => {
      initState.userInfoError = true;
      expect(user(initState, userInformationSuccess()).userInfoError).toBe(
        false
      );
    });
  });
  describe('userWalletSuccess action', () => {
    it('shouldn`t mutate init state', () => {
      expect(user(initState, userWalletSuccess())).not.toBe(initState);
    });

    it('should add action.payload to wallet', () => {
      expect(user(initState, userWalletSuccess({ btc: 100 })).wallet).toEqual({
        btc: 100
      });
    });
    it('should set false to walletError field', () => {
      initState.walletError = true;
      expect(user(initState, userWalletSuccess()).walletError).toBe(false);
    });
  });
  describe('userInformationFailure action', () => {
    it('shouldn`t mutate init state', () => {
      expect(user(initState, userInformationFailure())).not.toBe(initState);
    });

    it('should add action.error to userInfoError', () => {
      expect(
        user(initState, userInformationFailure(new Error())).userInfoError
      ).toEqual(true);
    });
  });
  describe('userWalletFailure action', () => {
    it('shouldn`t mutate init state', () => {
      expect(user(initState, userWalletFailure())).not.toBe(initState);
    });

    it('should add action.error to walletError', () => {
      expect(
        user(initState, userWalletFailure(new Error())).walletError
      ).toEqual(true);
    });
  });

  describe('sellCurrencySuccess action', () => {
    const payload = { usd: 100, btc: 5, eth: 3 };
    it('shouldn`t mutate init state', () => {
      expect(user(initState, sellCurrencySuccess(payload))).not.toBe(initState);
    });
    it('should set false to errorSell field', () => {
      initState.errorSell = true;
      expect(user(initState, sellCurrencySuccess(payload)).errorSell).toBe(
        false
      );
    });
    it('should set false to errorBuy field', () => {
      initState.errorSell = true;
      expect(user(initState, sellCurrencySuccess(payload)).errorBuy).toBe(
        false
      );
    });
    it('should add action.payload.usd to wallet.usd field', () => {
      expect(user(initState, sellCurrencySuccess(payload)).wallet.usd).toBe(
        100
      );
    });
    it('should add action.payload.btc to wallet.btc field', () => {
      expect(user(initState, sellCurrencySuccess(payload)).wallet.btc).toBe(5);
    });
    it('should add action.payload.eth to wallet.eth field', () => {
      expect(user(initState, sellCurrencySuccess(payload)).wallet.eth).toBe(3);
    });
  });

  describe('sellCurrencyFailure action', () => {
    it('shouldn`t mutate init state', () => {
      expect(user(initState, sellCurrencyFailure())).not.toBe(initState);
    });

    it('should add action.payload to errorSell', () => {
      initState.errorSell = false;
      expect(
        user(initState, sellCurrencyFailure({ error: 'error' })).errorSell
      ).toEqual({ error: 'error' });
    });
  });

  describe('buyCurrencySuccess action', () => {
    const payload = { usd: 100, btc: 5, eth: 3 };
    it('shouldn`t mutate init state', () => {
      expect(user(initState, buyCurrencySuccess(payload))).not.toBe(initState);
    });
    it('should set false to errorSell field', () => {
      initState.errorSell = true;
      expect(user(initState, buyCurrencySuccess(payload)).errorSell).toBe(
        false
      );
    });
    it('should set false to errorBuy field', () => {
      initState.errorSell = true;
      expect(user(initState, buyCurrencySuccess(payload)).errorBuy).toBe(false);
    });
    it('should add action.payload.usd to wallet.usd field', () => {
      expect(user(initState, buyCurrencySuccess(payload)).wallet.usd).toBe(100);
    });
    it('should add action.payload.btc to wallet.btc field', () => {
      expect(user(initState, buyCurrencySuccess(payload)).wallet.btc).toBe(5);
    });
    it('should add action.payload.eth to wallet.eth field', () => {
      expect(user(initState, buyCurrencySuccess(payload)).wallet.eth).toBe(3);
    });
  });

  describe('buyCurrencyFailure action', () => {
    it('shouldn`t mutate init state', () => {
      expect(user(initState, buyCurrencyFailure())).not.toBe(initState);
    });

    it('should add action.payload to errorBuy', () => {
      initState.errorBuy = false;
      expect(
        user(initState, buyCurrencyFailure({ error: 'error' })).errorBuy
      ).toEqual({ error: 'error' });
    });
  });

  describe('logout action', () => {
    it('shouldn`t mutate init state', () => {
      expect(user(initState, logout())).not.toBe(initState);
    });
    const initState = {
      userInfo: {
        email: ''
      },
      userInfoError: false,
      wallet: {
        usd: 0,
        btc: 0,
        eth: 0
      },
      walletError: false,
      errorSell: false,
      errorBuy: false
    };
    it('should refresh store to initState', () => {
      const currentState = { state: 'state' };
      expect(user(currentState, logout())).toEqual(initState);
    });
  });
});
