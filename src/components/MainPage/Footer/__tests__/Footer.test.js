import React from 'react';
import { Footer } from '../';
import { NavLink } from 'react-router-dom';
import { shallow } from 'enzyme';

describe('Component Footer', () => {
  const wrapper = shallow(<Footer />);

  describe('general markup', () => {
    it('Info block is exist', () => {
      expect(wrapper.find('.footer__info')).toHaveLength(1);
    });
    it('Logo is exist', () => {
      expect(wrapper.find('.footer__logo')).toHaveLength(1);
    });
  });
});
