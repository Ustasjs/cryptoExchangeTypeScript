import React from 'react';
import { Header } from '../';
import { NavLink } from 'react-router-dom';
import { shallow } from 'enzyme';

describe('Component Header', () => {
  const onClick = () => true;
  const currentPriceEth = 600;
  const currentPriceBtc = 15000;
  const match = { url: 'url' };
  const wrapper = shallow(
    <Header
      currentPriceEth={currentPriceEth}
      currentPriceBtc={currentPriceBtc}
      match={match}
    />
  );

  describe('general markup', () => {
    it('Logo is exist', () => {
      expect(wrapper.find('.header__logo')).toHaveLength(1);
    });
    describe('Navlinks', () => {
      const navLinks = wrapper.find(NavLink);
      it('2 Navlinks are exist', () => {
        expect(navLinks).toHaveLength(2);
      });
      it('Navlinks lead to "/btc" and "/eth" paths', () => {
        expect(navLinks.map(node => node.prop('to').substr(-4))).toEqual([
          '/btc',
          '/eth'
        ]);
      });
      it('First NavLink`s text content is equal to currentPriceBtc prop, rounded to 1 integer after dot', () => {
        expect(wrapper.find('#btcCurrentValue').text()).toBe('15000.0');
      });
      it('Second NavLink`s text content is equal to currentPriceEth prop, rounded to 1 integer after dot', () => {
        expect(wrapper.find('#ethCurrentValue').text()).toBe('600.0');
      });
    });
  });
});
