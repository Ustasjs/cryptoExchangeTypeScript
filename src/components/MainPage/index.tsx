import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ChartSection from './ChartSection';
import Account from './Account';
import TradeControls from './TradeControls';
import './MainPage.css';
import {
  getBtc,
  getEth,
  getBtcLoadingState,
  getEthLoadingState
} from '../../reducers/currency';
import {
  getUserEmail,
  getParsedUsd,
  getParsedBtc,
  getParsedEth
} from '../../reducers/user';
import { logout } from '../../actions/auth';
import { selectBtc, selectEth, selectOffset } from '../../actions/currency';
import { IMainPageBaseProps } from './types';

interface IMainPageProps extends IMainPageBaseProps {
  selectBtc: typeof selectBtc;
  selectEth: typeof selectEth;
  selectOffset: typeof selectOffset;
  logout: typeof logout;
}

export class MainPage extends Component<
  RouteComponentProps<{ url: string }> & IMainPageProps
> {
  render() {
    const { url } = this.props.match;
    const {
      btc,
      eth,
      btcLoadingState: { isLoaded: isBtcLoaded },
      ethLoadingState: { isLoaded: isEthLoaded },
      userEmail,
      usdWallet,
      btcWallet,
      ethWallet,
      selectBtc,
      selectEth,
      logout
    } = this.props;
    const currentPriceBtc = btc.currentSellPrice;
    const currentPriceEth = eth.currentSellPrice;

    return (
      <div className="mainPage">
        <Header
          url={this.props.match.url}
          onClick={this.handleCurrencyClick}
          currentPriceBtc={currentPriceBtc}
          currentPriceEth={currentPriceEth}
          email={userEmail}
          logout={logout}
        />
        <main className="content">
          <div className="wrapper">
            <div className="container container_content">
              <section className="trade">
                <Account usd={usdWallet} btc={btcWallet} eth={ethWallet} />
                <TradeControls />
              </section>
              <section className="data">
                <Switch>
                  <Route
                    path={`${url}/btc`}
                    exact
                    render={props => (
                      <ChartSection
                        onClick={this.handleOffsetClick}
                        data={btc}
                        isLoaded={isBtcLoaded}
                        {...props}
                        select={selectBtc}
                      />
                    )}
                  />
                  <Route
                    path={`${url}/eth`}
                    exact
                    render={props => (
                      <ChartSection
                        onClick={this.handleOffsetClick}
                        data={eth}
                        isLoaded={isEthLoaded}
                        {...props}
                        select={selectEth}
                      />
                    )}
                  />
                </Switch>
              </section>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  handleCurrencyClick = (e: React.MouseEvent<HTMLElement>): void => {
    const { selectBtc, selectEth } = this.props;
    const elementId = e.currentTarget.getAttribute('id');
    if (elementId === 'btc-link') {
      selectBtc();
    } else {
      selectEth();
    }
  };

  handleOffsetClick = (e: React.MouseEvent<HTMLElement>): void => {
    if (!(e.target instanceof HTMLElement)) {
      return;
    }
    const { selectOffset } = this.props;
    const value = e.target.dataset.value;
    const elements = document.querySelectorAll('[data-value]');
    if (value) {
      selectOffset(value);
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains('chart__button_active')) {
          elements[i].classList.remove('chart__button_active');
        }
      }
      e.target.classList.add('chart__button_active');
    }
  };
}

const mapStateToProps = (state: any) => ({
  // to-do протипизировать стор
  btc: getBtc(state),
  eth: getEth(state),
  btcLoadingState: getBtcLoadingState(state),
  ethLoadingState: getEthLoadingState(state),
  userEmail: getUserEmail(state),
  usdWallet: getParsedUsd(state),
  btcWallet: getParsedBtc(state),
  ethWallet: getParsedEth(state)
});
const mapDispatchToProps = {
  selectBtc,
  selectEth,
  selectOffset,
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
