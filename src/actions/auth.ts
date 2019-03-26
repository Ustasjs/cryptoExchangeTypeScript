import { createActions } from 'redux-actions';

const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';

const LOGIN_REQUEST = 'LOGIN_REQUEST';

export const {
  registrationRequest,
  registrationSuccess,
  registrationFailure
} = createActions(
  REGISTRATION_REQUEST,
  'REGISTRATION_SUCCESS',
  'REGISTRATION_FAILURE'
);

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout
} = createActions(LOGIN_REQUEST, 'LOGIN_SUCCESS', 'LOGIN_FAILURE', 'LOGOUT');

export interface ILoginRequest {
  type: typeof LOGIN_REQUEST;
  payload: {
    email: string;
    password: string;
  };
}

export interface IRegistrationRequest {
  type: typeof REGISTRATION_REQUEST;
  payload: {
    email: string;
    password: string;
  };
}
