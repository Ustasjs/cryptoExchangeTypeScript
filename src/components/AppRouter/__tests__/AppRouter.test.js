import React from 'react';
import { AppRouter } from '../';
import PrivateRoute from '../../PrivateRoute';
import { shallow } from 'enzyme';
import { Switch, Redirect } from 'react-router-dom';

describe('Component AppRouter', () => {
  const wrapper = shallow(<AppRouter />);
  describe('general markup', () => {
    it('Switch is exist', () => {
      expect(wrapper.find(Switch)).toHaveLength(1);
    });

    it("PrivateRoute with path='/trade' is exist", () => {
      const component = wrapper.findWhere(n => n.props().path === '/trade');
      expect(component.is(PrivateRoute)).toBeTruthy();
    });

    it("Redirect to '/' is exist", () => {
      const component = wrapper.findWhere(n => n.props().to === '/');
      expect(component.is(Redirect)).toBeTruthy();
    });
  });
});
