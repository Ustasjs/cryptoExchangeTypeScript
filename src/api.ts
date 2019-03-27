import axios from 'axios';
import { ICredentials } from './types';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'https://crypto-exchange-backend.herokuapp.com/'
    : '/';

axios.defaults.headers.post['Accept'] = '*/*';

const instance = axios.create({
  baseURL,
  headers: { Accept: '*/*' }
});

const jsonInstance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
});

export const setTokenApi = (access_token: string): void => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
};

export const clearTokenApi = (): void => {
  instance.defaults.headers.common['Authorization'] = undefined;
};

export const login = async ({ email, password }: ICredentials) => {
  const response = await jsonInstance.post('/user_token', { email, password });
  if (response.data.result === 'error') return Promise.reject(response);
  return response;
};

export const registration = async ({ email, password }: ICredentials) => {
  const response = await instance.post(
    '/users',
    `email=${email}&password=${password}`
  );

  if (response.data.result === 'error') return Promise.reject(response);
  return response;
};

export const candles = (symbol: string, offset: string) =>
  instance.get('/candles', { params: { symbol, offset } });
export const getWallet = () => instance.get('/users/wallet');

export const getUserInfo = () => instance.get('/users/me');

export const buyCurrency = async (currency: string, value: string) => {
  const response = await instance.get(
    `stock/exchange?symbol=${currency}&operation=purchase&sum=${value}`
  );
  if (response.data.result === 'error') {
    return Promise.reject(response.data.message);
  }
  return response;
};

export const sellCurrency = async (currency: string, value: string) => {
  const response = await instance.get(
    `stock/exchange?symbol=${currency}&operation=sell&sum=${value}`
  );
  if (response.data.result === 'error') {
    return Promise.reject(response.data.message);
  }
  return response;
};
