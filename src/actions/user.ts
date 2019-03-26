import { createActions } from 'redux-actions';

export const {
  userInformationRequest,
  userInformationSuccess,
  userInformationFailure,
  userWalletRequest,
  userWalletSuccess,
  userWalletFailure
} = createActions(
  'USER_INFORMATION_REQUEST',
  'USER_INFORMATION_SUCCESS',
  'USER_INFORMATION_FAILURE',
  'USER_WALLET_REQUEST',
  'USER_WALLET_SUCCESS',
  'USER_WALLET_FAILURE'
);
