import React from 'react';
import { LineChart } from 'react-chartkick';
import './Chart.css';
import Spinner from 'react-svg-spinner';

export function Chart(props) {
  const {
    shartWidth,
    shartHeight,
    isDataLoaded,
    min,
    max,
    purchase,
    sell,
    onClick
  } = props;
  return (
    <React.Fragment>
      <h2 className="title chart_title">Окно графика</h2>
      <ul className="chart__buttons" onClick={onClick}>
        <li className="chart__button chart__button_active" data-value="2h">
          2ч
        </li>
        <li className="chart__button" data-value="4h">
          4ч
        </li>
        <li className="chart__button" data-value="8h">
          8ч
        </li>
        <li className="chart__button" data-value="1d">
          1д
        </li>
        <li className="chart__button" data-value="7d">
          7д
        </li>
      </ul>
      <div className="chart__wrap">
        {!isDataLoaded ? (
          <div className="chart__spinner">
            <Spinner size="64px" color="#555658" gap={5} />
          </div>
        ) : null}
        <div
          className={isDataLoaded ? 'chart__content' : 'chart__content_hidden'}
        >
          <LineChart
            data={[
              {
                name: 'Продажа',
                data: sell
              },
              {
                name: 'Покупка',
                data: purchase
              }
            ]}
            min={min}
            max={max}
            legend={'bottom'}
            width={shartWidth}
            height={shartHeight}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Chart;
