import {
  registrationRequest,
  registrationSuccess,
  registrationFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  logout
} from '../../actions/auth';

import { auth, handleRegistrationError } from '../auth';

const initState = {
  isAuthorized: false,
  loginError: false,
  registrationError: false
};

describe('Auth reducer', () => {
  describe('registrationRequest action', () => {
    initState.registrationError = true;
    it('registrationRequest action makes registrationError false', () => {
      expect(auth(initState, registrationRequest()).registrationError).toBe(
        false
      );
    });
  });
  describe('registrationSuccess action', () => {
    initState.registrationError = true;
    it('registrationSuccess action makes isAuthorized true', () => {
      expect(auth(initState, registrationSuccess()).isAuthorized).toBe(true);
    });
    it('registrationSuccess action makes registrationError false', () => {
      expect(auth(initState, registrationSuccess()).registrationError).toBe(
        false
      );
    });
  });
  describe('registrationFailure action', () => {
    const message = {
      email: ['не содержит знак @', 'слишком длинное значение'],
      password: ['не содержит знак @', 'слишком длинное значение'],
      someprop: ['не содержит знак @', 'слишком длинное значение']
    };
    it('registrationFailure action makes isAuthorized false', () => {
      expect(
        auth(initState, registrationFailure({ message })).isAuthorized
      ).toBe(false);
    });
    it('registrationFailure action add to registrationError result of handleRegistrationError(action.payload.message)', () => {
      expect(
        auth(initState, registrationFailure({ message })).registrationError
      ).toBe(handleRegistrationError(message));
    });
  });
  describe('loginRequest action', () => {
    initState.loginError = false;
    it('loginRequest action makes loginError false', () => {
      expect(auth(initState, loginRequest()).loginError).toBe(false);
    });
  });
  describe('loginSuccess action', () => {
    initState.loginError = true;
    it('loginSuccess action makes isAuthorized true', () => {
      expect(auth(initState, loginSuccess()).isAuthorized).toBe(true);
    });
    it('loginSuccess action makes loginError false', () => {
      expect(auth(initState, loginSuccess()).loginError).toBe(false);
    });
  });
  describe('loginFailure action', () => {
    const message = {
      email: 'test@test.ru'
    };
    it('loginFailure action makes isAuthorized false', () => {
      expect(auth(initState, loginFailure({ message })).isAuthorized).toBe(
        false
      );
    });
    it('loginFailure action add to loginError message field)', () => {
      expect(auth(initState, loginFailure({ message })).loginError).toBe(
        message
      );
    });
  });
  describe('logout action', () => {
    it('logout action make is isAuthorized false', () => {
      initState.isAuthorized = true;
      expect(auth(initState, logout()).isAuthorized).toBe(false);
    });
  });
});

describe('function handleRegistrationError', () => {
  const message = {
    email: ['Email не содержит знак @', 'слишком длинное значение'],
    password: ['Password не содержит знак @', 'слишком длинное значение'],
    someprop: ['Someprop не содержит знак @', 'слишком длинное значение']
  };
  it('should return string', () => {
    expect(typeof handleRegistrationError(message) === 'string').toBeTruthy();
  });
  it('should combine arrays', () => {
    expect(handleRegistrationError(message)).toBe(
      'Email не содержит знак @ слишком длинное значение. Password не содержит знак @ слишком длинное значение. Someprop не содержит знак @ слишком длинное значение.'
    );
  });
});
