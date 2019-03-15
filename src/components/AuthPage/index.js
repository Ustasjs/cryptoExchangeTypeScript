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

export class AuthPage extends Component {
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
          <Particles params={params} />
        </div>
      </main>
    );
  }

  handleClick = authData => {
    const { loginRequest, registrationRequest } = this.props;
    const { isLoginStage } = this.state;

    isLoginStage ? loginRequest(authData) : registrationRequest(authData);
  };

  handleStatusChangeClick = () => {
    const { isLoginStage } = this.state;
    this.setState({ isLoginStage: !isLoginStage });
  };
}

const mapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state),
  loginError: getLoginError(state),
  registrationError: getRegistrationError(state)
});
const mapDispatchToProps = { loginRequest, registrationRequest };

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
