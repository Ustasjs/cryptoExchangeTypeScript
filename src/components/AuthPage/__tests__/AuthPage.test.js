import React from 'react';
import { AuthPage } from '../';
import { AuthForm } from '../AuthForm';
import Particles from 'react-particles-js';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';

describe('Component AuthPage', () => {
  describe('general markup', () => {
    const wrapper = shallow(<AuthPage />);
    it('Logo is exist', () => {
      expect(wrapper.find('img.logo')).toHaveLength(1);
    });
    it('AuthForm is exist', () => {
      expect(wrapper.find(AuthForm)).toHaveLength(1);
    });
    it('Auth footer is exist', () => {
      expect(wrapper.find('.auth__footer')).toHaveLength(1);
    });
    it('Particles is exist', () => {
      expect(wrapper.find(Particles)).toHaveLength(1);
    });
  });

  describe('Login stage', () => {
    const wrapper = shallow(<AuthPage />);
    wrapper.setState({ isLoginStage: true });
    it('Span with class "auth__text" is exist', () => {
      expect(wrapper.find('span.auth__text')).toHaveLength(1);
    });
    it('Span with class "auth__text" has content "Впервые на сайте?"', () => {
      expect(
        wrapper
          .find('span.auth__text')
          .html()
          .includes('Впервые на сайте?')
      ).toBeTruthy();
    });

    it('Tag a with class "auth__link" is exist', () => {
      expect(wrapper.find('a.auth__link')).toHaveLength(1);
    });

    it('Tag a class "auth__link" has content "Регистрация"', () => {
      expect(
        wrapper
          .find('a.auth__link')
          .html()
          .includes('Регистрация')
      ).toBeTruthy();
    });
  });

  describe('Registration stage', () => {
    const wrapper = shallow(<AuthPage />);
    wrapper.setState({ isLoginStage: false });
    it('Span with class "auth__text" is exist', () => {
      expect(wrapper.find('span.auth__text')).toHaveLength(1);
    });
    it('Span with class "auth__text" has content "Впервые на сайте?"', () => {
      expect(
        wrapper
          .find('span.auth__text')
          .html()
          .includes('Уже зарегистрированы?')
      ).toBeTruthy();
    });

    it('Tag a with class "auth__link" is exist', () => {
      expect(wrapper.find('a.auth__link')).toHaveLength(1);
    });

    it('Tag a class "auth__link" has content "Регистрация"', () => {
      expect(
        wrapper
          .find('a.auth__link')
          .html()
          .includes('Войти')
      ).toBeTruthy();
    });
  });
});
