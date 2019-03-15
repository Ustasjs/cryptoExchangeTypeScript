import { clearNetworkErrors, setNetworkError } from '../../actions/network';
import { networkError } from '../network';

describe('networkError reducer', () => {
  describe('setNetworkError action', () => {
    it('setNetworkError action add payload to networkError field', () => {
      expect(networkError(null, setNetworkError('message'))).toBe('message');
    });
    it('clearNetworkErrors clear networkError field', () => {
      expect(networkError('message', clearNetworkErrors())).toBe(null);
    });
  });
});
