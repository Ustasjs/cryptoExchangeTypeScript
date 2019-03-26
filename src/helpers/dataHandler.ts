import { ICurrency, IResponce, IResponceData } from '../types';

export function parseCurrency(numCurrency: number) {
  if (!numCurrency) return (0).toFixed(4).split('.');
  return numCurrency.toFixed(4).split('.');
}

export function handleInputData(response: IResponce): ICurrency {
  function handleDataForChart(
    inputData: IResponceData[],
    dataType: 'sell' | 'purchase'
  ): [Date, number][] {
    return inputData.map(
      (value: IResponceData): [Date, number] => [
        new Date(value.mts),
        value[dataType]
      ]
    );
  }

  function getExtremeValue(
    inputData: IResponceData[],
    typeOfExtreme: 'max' | 'min'
  ): string {
    switch (typeOfExtreme) {
      case 'max':
        let sellMax = getMaxValueOfProp(inputData, 'sell');
        let purchaseMax = getMaxValueOfProp(inputData, 'purchase');
        return Math.max(sellMax, purchaseMax).toFixed(2);
      case 'min':
        let sellMin = getMinValueOfProp(inputData, 'sell');
        let purchaseMin = getMinValueOfProp(inputData, 'purchase');
        return Math.min(sellMin, purchaseMin).toFixed(2);
      default:
        throw new Error(
          'Неверное значения аргумента typeOfExtreme, аргумент может принимать только значения min и max'
        );
    }
  }

  const result: ICurrency = {
    sell: [],
    purchase: [],
    currentSellPrice: 0,
    currentPurchasePrice: 0,
    min: '0',
    max: '0',
    data: response.data.result
  };
  result.sell = handleDataForChart(result.data, 'sell');
  result.purchase = handleDataForChart(result.data, 'purchase');
  result.currentSellPrice = result.sell[0][1];
  result.currentPurchasePrice = result.purchase[0][1];
  result.min = getExtremeValue(result.data, 'min');
  result.max = getExtremeValue(result.data, 'max');

  return result;
}

export function getMinValueOfProp(
  arr: IResponceData[],
  prop: 'sell' | 'purchase'
) {
  let elementWithMinValue = arr.reduce((prev, current) => {
    return current[prop] < prev[prop] ? current : prev;
  });
  return elementWithMinValue[prop];
}

export function getMaxValueOfProp(
  arr: IResponceData[],
  prop: 'sell' | 'purchase'
) {
  let elementWithMaxValue = arr.reduce((prev, current) => {
    return current[prop] > prev[prop] ? current : prev;
  });
  return elementWithMaxValue[prop];
}
