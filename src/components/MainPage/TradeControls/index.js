import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSelected, getBtc, getEth } from '../../../reducers/currency';
import { getErrorBuy, getErrorSell } from '../../../reducers/user';
import { sellCurrencyRequest, buyCurrencyRequest } from '../../../actions/trade';
import './TradeControls.css';

export class TradeControls extends Component {
  state = {
    resultValue: '',
    inputError: false,
    currencyInputError: false,
    sellInputError: false,
    purchaseInputError: false,
    sellCost: '',
    purchaseCost: ''
  };

  componentWillReceiveProps(nextProps) {
    const { resultValue, inputError } = this.state;
    const { selected } = this.props.selected;
    const newSelected = nextProps.selected;
    if (selected !== nextProps.selected && !inputError) {
      this.setState({
        ...this.state,
        sellCost: this.getCurrencyPrice(resultValue, newSelected, 'sell'),
        purchaseCost: this.getCurrencyPrice(resultValue, newSelected, 'purchase')
      });
    }
  }

  render() {
    const { selected, errorSell, errorBuy } = this.props;
    const {
      resultValue,
      sellCost,
      purchaseCost,
      inputError,
      currencyInputError,
      sellInputError,
      purchaseInputError
    } = this.state;
    return (
      <div className="controls">
        <h2 className="title controls_title">Покупка / продажа</h2>
        {inputError ? <div className="controls__error">{inputError}</div> : false}
        {errorSell || errorBuy ? (
          <div className="controls__error controls__error_trade">Недостаточно средств</div>
        ) : (
          false
        )}
        <ul className="controls__list">
          <li className="control">
            <div className="control__wrap">
              <div className="input">
                <input
                  maxLength="18"
                  type="text"
                  className={
                    'input__value input__value_btc' +
                    (currencyInputError ? ' input__value_error' : '')
                  }
                  value={resultValue}
                  id="currency"
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputBlur}
                />
                <span className="input__type">{selected.toUpperCase()}</span>
              </div>
            </div>
          </li>
          <li className="control">
            <div className="control__wrap">
              <div className="input">
                <input
                  maxLength="18"
                  type="text"
                  className={
                    'input__value input__value_btc' +
                    (purchaseInputError ? ' input__value_error' : '')
                  }
                  value={purchaseCost}
                  id="purchase"
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputBlur}
                />
                <span className="input__type">$</span>
              </div>
              <button
                type="button"
                className="control__button control__button_sell"
                onClick={this.handleClick}
              >
                Продать
              </button>
            </div>
          </li>
          <li className="control">
            <div className="control__wrap">
              <div className="input">
                <input
                  maxLength="18"
                  type="text"
                  className={
                    'input__value input__value_btc' + (sellInputError ? ' input__value_error' : '')
                  }
                  value={sellCost}
                  id="sell"
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputBlur}
                />
                <span className="input__type">$</span>
              </div>
              <button
                type="button"
                className="control__button control__button_buy"
                onClick={this.handleClick}
              >
                Купить
              </button>
            </div>
          </li>
        </ul>
      </div>
    );
  }

  handleInputChange = e => {
    const { selected } = this.props;
    const value = e.target.value;
    const targetId = e.target.getAttribute('id');
    let targetKey;
    let firstRelatedKey;
    let secondRelatedKey;
    let firstRelatedValue;
    let secondRelatedValue;

    switch (targetId) {
      case 'currency':
        targetKey = 'resultValue';
        firstRelatedKey = 'sellCost';
        secondRelatedKey = 'purchaseCost';
        firstRelatedValue = this.getCurrencyPrice(value, selected, 'sell');
        secondRelatedValue = this.getCurrencyPrice(value, selected, 'purchase');
        break;
      case 'sell':
        targetKey = 'sellCost';
        firstRelatedKey = 'resultValue';
        secondRelatedKey = 'purchaseCost';
        firstRelatedValue = this.getCurrencyValue(value, selected, targetId);
        secondRelatedValue = this.getCurrencyPrice(firstRelatedValue, selected, 'purchase');
        break;
      case 'purchase':
        targetKey = 'purchaseCost';
        firstRelatedKey = 'resultValue';
        secondRelatedKey = 'sellCost';
        firstRelatedValue = this.getCurrencyValue(value, selected, targetId);
        secondRelatedValue = this.getCurrencyPrice(firstRelatedValue, selected, 'sell');
        break;
      default:
        return;
    }

    this.setState({ ...this.state, [targetKey]: value }, () => {
      if (/^([0-9]*[.])?[0-9]+$/.test(value) || value === '') {
        this.setState({
          ...this.state,
          [firstRelatedKey]: firstRelatedValue,
          [secondRelatedKey]: secondRelatedValue,
          inputError: false,
          currencyInputError: false,
          sellInputError: false,
          purchaseInputError: false
        });
      }
    });
  };

  handleInputBlur = e => {
    const value = e.target.value;
    const targetId = e.target.getAttribute('id');
    let errorType;

    switch (targetId) {
      case 'currency':
        errorType = 'currencyInputError';
        break;
      case 'sell':
        errorType = 'sellInputError';
        break;
      case 'purchase':
        errorType = 'purchaseInputError';
        break;
      default:
        return;
    }

    if (!/^([0-9]*[.])?[0-9]+$/.test(value) && value !== '') {
      this.setState({
        ...this.state,
        inputError: 'Введите положительное число',
        [errorType]: true
      });
    } else {
      this.setState({
        ...this.state,
        inputError: false,
        [errorType]: false
      });
    }
  };

  handleClick = e => {
    const { resultValue, inputError } = this.state;
    const { selected, sellCurrencyRequest, buyCurrencyRequest } = this.props;
    const payload = { currency: selected, value: resultValue };
    if (inputError || !resultValue) return;

    if (e.target.classList.contains('control__button_sell')) {
      sellCurrencyRequest(payload);
    } else {
      buyCurrencyRequest(payload);
    }
  };

  getCurrencyPrice = (value, typeOfValue, typeOfAction) => {
    const { btc, eth } = this.props;

    if (!value || !btc.currentSellPrice || !eth.currentSellPrice) {
      return '';
    }

    if (typeOfAction !== 'sell' && typeOfAction !== 'purchase') {
      throw new Error('Введен неверный тип транзакции');
    }

    switch (typeOfValue) {
      case 'btc':
        return typeOfAction === 'sell'
          ? (value * btc.currentSellPrice).toFixed(2)
          : (value * btc.currentPurchasePrice).toFixed(2);
      case 'eth':
        return typeOfAction === 'sell'
          ? (value * eth.currentSellPrice).toFixed(2)
          : (value * eth.currentPurchasePrice).toFixed(2);
      default:
        throw new Error('Введен неверный тип валюты');
    }
  };

  getCurrencyValue = (value, typeOfValue, typeOfAction) => {
    const { btc, eth } = this.props;
    if (!value) return '';

    if (typeOfAction !== 'sell' && typeOfAction !== 'purchase') {
      throw new Error('Введен неверный тип транзакции');
    }

    switch (typeOfValue) {
      case 'btc':
        return typeOfAction === 'sell'
          ? value / btc.currentSellPrice
          : value / btc.currentPurchasePrice;
      case 'eth':
        return typeOfAction === 'sell'
          ? value / eth.currentSellPrice
          : value / eth.currentPurchasePrice;
      default:
        throw new Error('Введен неверный тип валюты');
    }
  };
}

const mapStateToProps = state => ({
  selected: getSelected(state),
  btc: getBtc(state),
  eth: getEth(state),
  errorSell: getErrorSell(state),
  errorBuy: getErrorBuy(state)
});
const mapDispatchToProps = {
  sellCurrencyRequest,
  buyCurrencyRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeControls);
