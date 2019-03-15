import { fork } from 'redux-saga/effects';
import { authFlow } from './auth';
import { fetchLoginWatch } from './login';
import { fetchRegistrationWatch } from './registration';
import { fetchUserWatch } from './user';
import { fetchBtcWatch, fetchEthWatch, currencyWatch } from './currency';
import { fetchSellCurrencyWatch, fetchBuyCurrencyWatch } from './trade';

export default function*() {
  yield fork(authFlow);
  yield fork(fetchLoginWatch);
  yield fork(fetchRegistrationWatch);
  yield fork(fetchBtcWatch);
  yield fork(fetchEthWatch);
  yield fork(currencyWatch);
  yield fork(fetchUserWatch);
  yield fork(fetchSellCurrencyWatch);
  yield fork(fetchBuyCurrencyWatch);
}
