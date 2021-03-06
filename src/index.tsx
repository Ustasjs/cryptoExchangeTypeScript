import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.scss';
import './static/styles/font.scss';
import './static/styles/main.scss';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createStore from './store';
import AppRouter from './components/AppRouter';

declare global {
  interface Window {
    Chart: Chart;
  }
}

window.Chart = require('chart.js');

const store = createStore();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
