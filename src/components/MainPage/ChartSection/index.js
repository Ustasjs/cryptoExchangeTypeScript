import React, { Component } from 'react';
import Chart from './Chart';
import './ChartSection.css';
import rotateIcon from './rotateIcon.svg';

export class ChartSection extends Component {
  state = {
    isDataLoaded: true,
    windowWidth: 768,
    phoneOrientation: null
  };

  componentDidMount() {
    const { select } = this.props;
    select();

    window.addEventListener('resize', this.checkWidth);
    window.addEventListener('resize', this.checkPhoneOrientation);
    this.checkWidth();
    this.checkPhoneOrientation();
  }

  componentWillReceiveProps(nextProps) {
    const { isLoaded } = nextProps;
    if (isLoaded) {
      this.setState({ isDataLoaded: true });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkWidth);
    window.removeEventListener('resize', this.checkPhoneOrientation);
  }

  render() {
    const { min, max, purchase, sell } = this.props.data;
    const { isDataLoaded, windowWidth, phoneOrientation } = this.state;
    const shartWidth = windowWidth * 0.95 + 'px';
    const shartHeight = windowWidth * 0.95 * 0.56 + 'px';

    return (
      <div className="chart">
        {phoneOrientation === 'portrait' ? (
          <img
            className="rotate-icon"
            src={rotateIcon}
            alt="Поверните телефон в альбомную ориентацию"
          />
        ) : (
          <Chart
            {...{
              shartWidth,
              shartHeight,
              isDataLoaded,
              phoneOrientation,
              min,
              max,
              purchase,
              sell,
              onClick: this.handleClick
            }}
          />
        )}
        <br />
      </div>
    );
  }

  handleClick = e => {
    const { onClick } = this.props;
    this.setState({ isDataLoaded: false });
    onClick(e);
  };

  checkPhoneOrientation = () => {
    const width = document.documentElement.clientWidth;
    const { phoneOrientation } = this.state;
    if (
      width < 480 &&
      window.matchMedia('(orientation: portrait)').matches &&
      !phoneOrientation
    ) {
      this.setState({ phoneOrientation: 'portrait' });
    }
    if (phoneOrientation && width >= 480) {
      this.setState({ phoneOrientation: null });
    }
  };

  checkWidth = () => {
    const width = document.documentElement.clientWidth;
    const { windowWidth } = this.state;
    if (width <= 768) {
      this.setState({ windowWidth: width });
    }

    if (width > 768 && windowWidth < 768) {
      this.setState({ windowWidth: 768 });
    }
  };
}

export default ChartSection;
