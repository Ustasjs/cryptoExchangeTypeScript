interface ICurrencyData {
  high: number;
  low: number;
  mts: number;
  purchase: number;
  sell: number;
}

export interface ICurrency {
  currentPurchasePrice: number;
  currentSellPrice: number;
  data: ICurrencyData[];
  max: string;
  min: string;
  purchase: exchange[];
  sell: exchange[];
}

interface ILoadingState {
  error: string | boolean;
  isLoading: boolean;
  isLoaded: boolean;
}

export type exchange = [Date, number];
export type wallet = [string, string];

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
