import React, { Component } from 'react';
import './Account.css';

export class Account extends Component {
  render() {
    const { usd, btc, eth } = this.props;
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
}

export default Account;
