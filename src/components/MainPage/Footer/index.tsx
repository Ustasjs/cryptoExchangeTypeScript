import React, { Component } from 'react';
import './Footer.css';
import footerLogo from '../images/Logo-white.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="container container__footer">
        <div className="footer__item footer__item_left">
          <div className="footer__info">
            <p className="footer__par">Автор: Устюжанин Станислав.</p>
          </div>
        </div>
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
