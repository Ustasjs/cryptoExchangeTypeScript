import React from 'react';
import Footer from '../';
import { shallow } from 'enzyme';

describe('Component Footer', () => {
  const wrapper = shallow(<Footer />);

  describe('general markup', () => {
    it('Logo is exist', () => {
      expect(wrapper.find('.footer__logo')).toHaveLength(1);
    });
  });
});
