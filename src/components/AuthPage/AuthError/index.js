import React from 'react';
import './AuthError.css';

export function AuthError(props) {
  const { isLoginStage, loginError, registrationError, inputError } = props;
  return (
    <div className="AuthError">
      <div className="error__content" id="inputError">
        {inputError ? inputError : null}
      </div>
      <div className="error__content" id="flowError">
        {isLoginStage ? loginError : registrationError}
      </div>
    </div>
  );
}
