import { createActions } from 'redux-actions';

export const {
  userInformationSuccess,
  userInformationFailure,
  userWalletSuccess,
  userWalletFailure
} = createActions(
  'USER_INFORMATION_SUCCESS',
  'USER_INFORMATION_FAILURE',
  'USER_WALLET_SUCCESS',
  'USER_WALLET_FAILURE'
);
