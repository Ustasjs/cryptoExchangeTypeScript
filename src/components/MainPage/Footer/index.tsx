import React, { Component } from 'react';
import './Footer.scss';
import footerLogo from '../images/Logo-white.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="container container__footer">
        <div className="footer__item footer__item_right">
          <div className="footer__wrap">
            <img src={footerLogo} alt="logo" className="footer__logo" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
