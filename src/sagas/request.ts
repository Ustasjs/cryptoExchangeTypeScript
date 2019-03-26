import { call, put, select } from 'redux-saga/effects';
import { clearNetworkErrors, setNetworkError } from '../actions/network';
import { getIsNetworkErrorPresent } from '../reducers/network';

export default function* requestFlow(
  fn: (...args: any[]) => any,
  ...args: any
): any {
  try {
    const response = yield call(fn, ...args);
    if (yield select(getIsNetworkErrorPresent)) yield put(clearNetworkErrors());
    return response;
  } catch (error) {
    const { response } = error;
    if (response.status >= 400) {
      yield put(setNetworkError(response));
    }

    throw response;
  }
}
