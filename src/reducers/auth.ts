import {
  registrationRequest,
  registrationSuccess,
  registrationFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  logout
} from '../actions/auth';
import { handleActions } from 'redux-actions';
import { IStore } from '../types';

export interface IAuthState {
  isAuthorized: boolean;
  loginError?: string | null;
  registrationError?: string | null;
}

interface IAuthActionPayload {
  message?: IObjectErrors | undefined;
}

interface IObjectErrors {
  [x: string]: string[];
}

const initState: IAuthState = {
  isAuthorized: false,
  loginError: null,
  registrationError: null
};

export const auth = handleActions<IAuthState, IAuthActionPayload>(
  {
    [registrationRequest.toString()]: state => ({
      ...state,
      registrationError: null
    }),
    [registrationSuccess.toString()]: state => ({
      ...state,
      isAuthorized: true,
      registrationError: null
    }),
    [registrationFailure.toString()]: (state, action) => ({
      ...state,
      isAuthorized: false,
      registrationError: handleRegistrationError(
        action.payload && action.payload.message
      )
    }),
    [loginRequest.toString()]: state => ({
      ...state,
      loginError: null
    }),
    [loginSuccess.toString()]: state => ({
      ...state,
      isAuthorized: true,
      loginError: null
    }),
    [loginFailure.toString()]: (state, action) => ({
      ...state,
      isAuthorized: false,
      loginError: handleRegistrationError(
        action.payload && action.payload.message
      )
    }),
    [logout.toString()]: state => ({
      ...state,
      isAuthorized: false
    })
  },
  initState
);

export function handleRegistrationError(
  error: IObjectErrors | string | undefined
) {
  if (!error) return null;
  if (typeof error === 'string') return error;
  let errorKeys = Object.keys(error);
  return errorKeys
    .map(value => {
      const resultValue = error[value];
      return [...resultValue].join(' ') + '.';
    })
    .join(' ');
}

export const getIsAuthorized = (state: IStore) => state.auth.isAuthorized;
export const getLoginError = (state: IStore) => state.auth.loginError;
export const getRegistrationError = (state: IStore) =>
  state.auth.registrationError;
