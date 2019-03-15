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

const initState = {
  isAuthorized: false,
  loginError: false,
  registrationError: false
};

export const auth = handleActions(
  {
    [registrationRequest]: (state, action) => ({
      ...state,
      registrationError: false
    }),
    [registrationSuccess]: (state, action) => ({
      ...state,
      isAuthorized: true,
      registrationError: false
    }),
    [registrationFailure]: (state, action) => ({
      ...state,
      isAuthorized: false,
      registrationError: handleRegistrationError(action.payload.message)
    }),
    [loginRequest]: (state, action) => ({
      ...state,
      loginError: false
    }),
    [loginSuccess]: (state, action) => ({
      ...state,
      isAuthorized: true,
      loginError: false
    }),
    [loginFailure]: (state, action) => ({
      ...state,
      isAuthorized: false,
      loginError: action.payload.message
    }),
    [logout]: (state, action) => ({
      ...state,
      isAuthorized: false
    })
  },
  initState
);

export function handleRegistrationError(errorObj) {
  let errorKeys = Object.keys(errorObj);
  return errorKeys
    .map(value => [].concat(errorObj[value]).join(' ') + '.')
    .join(' ');
}

export const getIsAuthorized = state => state.auth.isAuthorized;
export const getLoginError = state => state.auth.loginError;
export const getRegistrationError = state => state.auth.registrationError;

export default auth;
