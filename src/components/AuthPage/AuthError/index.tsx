import React from 'react';
import './AuthError.css';

interface IAuthErrorProps {
  isLoginStage: boolean;
  loginError?: string | null;
  registrationError?: string | null;
  inputError: string | null;
}

export function AuthError(props: IAuthErrorProps) {
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
