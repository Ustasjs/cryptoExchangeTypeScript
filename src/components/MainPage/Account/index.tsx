import React, { Component } from 'react';
import { wallet } from '../types';
import './Account.css';

interface IAccountProps {
  usd: wallet;
  btc: wallet;
  eth: wallet;
}

export default function Account(props: IAccountProps) {
  const { usd, btc, eth } = props;
  return (
    <div className="account">
      <h2 className="title account_title">Ваш счет</h2>
      <ul className="account__list">
        <li className="account__item">
          <div className="value">
            <span className="value__integer">{btc[0]}</span>
            <span className="value__dot">.</span>
            <span className="value__fraction">{btc[1]}</span>
          </div>
          <div className="account__currency">BTC</div>
        </li>
        <li className="account__item">
          <div className="value">
            <span className="value__integer">{eth[0]}</span>
            <span className="value__dot">.</span>
            <span className="value__fraction">{eth[1]}</span>
          </div>
          <div className="account__currency">ETH</div>
        </li>
        <li className="account__item">
          <div className="value">
            <span className="value__integer">{usd[0]}</span>
            <span className="value__dot">.</span>
            <span className="value__fraction">{usd[1]}</span>
          </div>
          <div className="account__currency">$</div>
        </li>
      </ul>
    </div>
  );
}
