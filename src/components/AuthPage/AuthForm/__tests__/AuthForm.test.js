import React from 'react';
import { AuthForm } from '../';
import { AuthError } from '../../AuthError';
import { shallow } from 'enzyme';

describe('Component AuthPage', () => {
  const isLoginStage = true;
  const loginError = 'loginError';
  const registrationError = 'registrationError';
  const wrapper = shallow(
    <AuthForm isLoginStage loginError registrationError />
  );
  describe('general markup', () => {
    it('Input with id "email" is exist', () => {
      expect(wrapper.find('input#email')).toHaveLength(1);
    });
    it('Input with id "password" is exist', () => {
      expect(wrapper.find('input#password')).toHaveLength(1);
    });
    it('AuthError is exist', () => {
      expect(wrapper.find(AuthError)).toHaveLength(1);
    });

    describe('Submit button', () => {
      it('Submit button is exist', () => {
        expect(wrapper.find('button.auth__submit')).toHaveLength(1);
      });

      it('If isLoginStage === true submit button has content "Войти"', () => {
        expect(
          wrapper
            .find('button.auth__submit')
            .html()
            .includes('Войти')
        ).toBeTruthy();
      });
      it('If isLoginStage === false submit button has content "Зарегестрироваться"', () => {
        wrapper.setProps({ isLoginStage: false });
        expect(
          wrapper
            .find('button.auth__submit')
            .html()
            .includes('Зарегестрироваться')
        ).toBeTruthy();
      });
    });
  });
});
