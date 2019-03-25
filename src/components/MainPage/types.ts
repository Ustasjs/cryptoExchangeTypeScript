import { ILoadingState, ICurrency } from '../../types';

export type wallet = string[];

export interface IMainPageBaseProps {
  btc: ICurrency;
  eth: ICurrency;
  btcWallet: wallet;
  ethWallet: wallet;
  usdWallet: wallet;
  btcLoadingState: ILoadingState;
  ethLoadingState: ILoadingState;
  userEmail: string;
}
