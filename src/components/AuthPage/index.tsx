import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './AuthPage.css';
import logo from './images/Logo.svg';
import AuthForm from './AuthForm';
import Particles from 'react-particles-js';
import params from '../../particles-params';
import { loginRequest } from '../../actions/auth';
import { registrationRequest } from '../../actions/auth';
import {
  getIsAuthorized,
  getLoginError,
  getRegistrationError
} from '../../reducers/auth';
import { ICredentials, IParaticlesParams } from '../../types';

interface IAuthPageState {
  isLoginStage: boolean;
}

interface IAuthPageProps {
  loginError?: string;
  registrationError?: string;
  isAuthorized: boolean;
  loginRequest: typeof loginRequest;
  registrationRequest: typeof registrationRequest;
}

const particlesParams = params as IParaticlesParams;

export class AuthPage extends Component<IAuthPageProps, IAuthPageState> {
  state = {
    isLoginStage: true
  };

  render() {
    const { isLoginStage } = this.state;
    const { loginError, registrationError, isAuthorized } = this.props;

    if (isAuthorized) {
      return <Redirect to="/trade/btc" />;
    }
    return (
      <main className="AuthPage">
        <div className="auth">
          <div className="auth__wrap">
            <img src={logo} alt="logo" className="logo" />
            <AuthForm
              onClick={this.handleClick}
              isLoginStage={isLoginStage}
              loginError={loginError}
              registrationError={registrationError}
            />
          </div>
          <div className="auth__footer">
            {isLoginStage ? (
              <span className="auth__text">Впервые на сайте?</span>
            ) : (
              <span className="auth__text">Уже зарегестрированы?</span>
            )}
            <a className="auth__link" onClick={this.handleStatusChangeClick}>
              {isLoginStage ? 'Регистрация' : 'Войти'}
            </a>
          </div>
        </div>
        <div className="animation">
          <Particles params={particlesParams} />
        </div>
      </main>
    );
  }

  handleClick = (authData: ICredentials): void => {
    const { loginRequest, registrationRequest } = this.props;
    const { isLoginStage } = this.state;

    isLoginStage ? loginRequest(authData) : registrationRequest(authData);
  };

  handleStatusChangeClick = (): void => {
    const { isLoginStage } = this.state;
    this.setState({ isLoginStage: !isLoginStage });
  };
}

const mapStateToProps = (state: IAuthPageState) => ({
  isAuthorized: getIsAuthorized(state),
  loginError: getLoginError(state),
  registrationError: getRegistrationError(state)
});
const mapDispatchToProps = { loginRequest, registrationRequest };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthPage);
