import React from 'react';
import { LineChart } from 'react-chartkick';
import './Chart.scss';
import Spinner from 'react-svg-spinner';
import { exchange } from '../../../../types';

interface IChart {
  chartWidth: string;
  chartHeight: string;
  isDataLoaded: boolean;
  min: string;
  max: string;
  purchase: exchange[];
  sell: exchange[];
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function Chart(props: IChart) {
  const {
    chartWidth,
    chartHeight,
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
      <ul className="chart__buttons">
        <li
          className="chart__button chart__button_active"
          data-value="2h"
          onClick={onClick}
        >
          2ч
        </li>
        <li className="chart__button" data-value="4h" onClick={onClick}>
          4ч
        </li>
        <li className="chart__button" data-value="8h" onClick={onClick}>
          8ч
        </li>
        <li className="chart__button" data-value="1d" onClick={onClick}>
          1д
        </li>
        <li className="chart__button" data-value="7d" onClick={onClick}>
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
            width={chartWidth}
            height={chartHeight}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
