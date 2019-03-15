import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import './static/styles/font.css';
import './static/styles/main.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createStore from './store';
import AppRouter from './components/AppRouter';

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
