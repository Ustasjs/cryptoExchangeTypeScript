import { getMaxValueOfProp, getMinValueOfProp } from '../dataHandler';

let arrr = [
  { sell: 1 },
  { sell: -11 },
  { sell: -1 },
  { sell: 0 },
  { sell: 2 },
  { sell: 3 },
  { sell: 4 },
  { sell: 5 },
  { sell: 16 },
  { sell: 0 }
];

describe('getMinValueOfProp', () => {
  it('should return minimum value of specified props in array of object', () => {
    expect(getMinValueOfProp(arrr, 'sell')).toBe(-11);
  });
});

describe('getMaxValueOfProp', () => {
  it('should return maximum value of specified props in array of object', () => {
    expect(getMaxValueOfProp(arrr, 'sell')).toBe(16);
  });
});
