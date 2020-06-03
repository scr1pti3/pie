import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import Container from './components/container.js';
import store from './store';

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import './style.css';

ReactDOM.render(
  <Provider store={store}>
    <Container/>
  </Provider>,
  document.getElementById('root')
)
