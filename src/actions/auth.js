import { createActions } from 'redux-actions';

export const {
  registrationRequest,
  registrationSuccess,
  registrationFailure
} = createActions(
  'REGISTRATION_REQUEST',
  'REGISTRATION_SUCCESS',
  'REGISTRATION_FAILURE'
);

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout
} = createActions('LOGIN_REQUEST', 'LOGIN_SUCCESS', 'LOGIN_FAILURE', 'LOGOUT');
