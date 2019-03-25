import React, { Component } from 'react';
import { AuthError } from '../AuthError';
import './AuthForm.css';
import userShape from './images/user-shape.svg';
import lockShape from './images/padlock-unlock.svg';

interface IAuthErrorState {
  [x: string]: string | null;
}

type inputType = {
  id: string;
  value: string;
};

interface IAuthErrorProps {
  isLoginStage: boolean;
  loginError?: string | null;
  registrationError?: string | null;
  onClick: (input: { email: string; password: string }) => void;
}

export class AuthForm extends Component<IAuthErrorProps, IAuthErrorState> {
  state = {
    email: '',
    password: '',
    inputError: null
  };

  render() {
    const { email, password, inputError } = this.state;
    const { isLoginStage, loginError, registrationError } = this.props;
    return (
      <form className="auth__form">
        <div className="auth__login-wrap">
          <img src={userShape} alt="icon" className="auth__icon" />
          <input
            id="email"
            placeholder="email"
            type="email"
            className="auth__input"
            value={email}
            onChange={this.handleChange}
          />
        </div>
        <div className="auth__login-wrap">
          <img src={lockShape} alt="icon" className="auth__icon" />
          <input
            id="password"
            placeholder="password"
            type="password"
            className="auth__input"
            value={password}
            onChange={this.handleChange}
          />
        </div>
        <AuthError
          isLoginStage={isLoginStage}
          loginError={loginError}
          registrationError={registrationError}
          inputError={inputError}
        />
        <button
          type="submit"
          className="auth__submit"
          onClick={this.handleClick}
        >
          {isLoginStage ? 'Войти' : 'Зарегестрироваться'}
        </button>
      </form>
    );
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input: inputType = e.target;
    this.setState({ [input.id]: input.value });
  };

  handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onClick } = this.props;
    const { email, password } = this.state;
    e.preventDefault();

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({ inputError: 'Email не корректен' });
    } else if (email === '' || password === '') {
      this.setState({ inputError: 'Оба поля обязательны для заполнения' });
    } else {
      this.setState({ inputError: null });
      onClick({ email, password });
    }
  };
}

export default AuthForm;
