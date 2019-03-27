import React, { Component } from 'react';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import './Header.scss';
import headerLogo from '../images/Logo-white.svg';
import { logout } from '../../../actions/auth';

interface IHeaderProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  currentPriceEth: number;
  currentPriceBtc: number;
  email: string;
  logout: typeof logout;
  url: string;
}

export class Header extends Component<IHeaderProps> {
  render() {
    const { url } = this.props;
    const { onClick, currentPriceEth, currentPriceBtc, email } = this.props;
    return (
      <header className="header">
        <div className="container container_header">
          <div className="header__item header__item_left">
            <div className="header__wrap">
              <img src={headerLogo} alt="logo" className="header__logo" />
            </div>
          </div>
          <ul className="header__item header__item_currency">
            <li className="currency">
              <NavLink
                onClick={onClick}
                to={`${url}/btc`}
                className="currency__link"
                id="btc-link"
                activeClassName="currency__link_active"
              >
                <div className="currency__value" id="btcCurrentValue">
                  {this.roundPrices(currentPriceBtc)}
                </div>
                <div className="currency__type">1 BTC</div>
              </NavLink>
            </li>
            <li className="currency">
              <NavLink
                onClick={onClick}
                to={`${url}/eth`}
                className="currency__link"
                id="eth-link"
                activeClassName="currency__link_active"
              >
                <div className="currency__value" id="ethCurrentValue">
                  {this.roundPrices(currentPriceEth)}
                </div>
                <div className="currency__type">1 ETH</div>
              </NavLink>
            </li>
          </ul>
          <ul className="header__item header__item_right">
            <li className="header__userInfo header__userInfo_email">{email}</li>
            <li
              className="header__userInfo header__userInfo_logout header__userInfo_clickable"
              onClick={this.handleClick}
            >
              Logout
            </li>
          </ul>
        </div>
      </header>
    );
  }

  handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { logout } = this.props;
    logout();
  };

  roundPrices = (price: number) => (price ? price.toFixed(1) : price);
}

export default Header;
