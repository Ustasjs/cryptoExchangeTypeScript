import React from 'react';
import { AuthError } from '../';
import { shallow } from 'enzyme';

describe('Component AuthError', () => {
  const isLoginStage = true;
  const loginError = 'loginError';
  const registrationError = 'registrationError';
  const inputError = 'inputError';
  const wrapper = shallow(<AuthError />);

  wrapper.setProps({
    isLoginStage: true,
    loginError: 'loginError',
    registrationError: 'registrationError',
    inputError: 'inputError'
  });

  it('Div with id "inputError" is exist', () => {
    expect(wrapper.find('div#inputError')).toHaveLength(1);
  });
  it('Div with id "inputError" has text content equals to inputError', () => {
    expect(
      wrapper
        .find('div#inputError')
        .html()
        .includes('inputError')
    ).toBeTruthy();
  });
  it('Div with id "flowError" is exist', () => {
    expect(wrapper.find('div#flowError')).toHaveLength(1);
  });

  it('If it is a login stage div with id "flowError" has text content equals to loginError', () => {
    expect(
      wrapper
        .find('div#flowError')
        .html()
        .includes('loginError')
    ).toBeTruthy();
  });
  it('If it is a registration stage div with id "flowError" has text content equals to registrationError', () => {
    wrapper.setProps({ isLoginStage: false });
    expect(
      wrapper
        .find('div#flowError')
        .html()
        .includes('registrationError')
    ).toBeTruthy();
  });
});
