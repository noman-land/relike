import React from 'react';
import ReactDOM from 'react-dom';

import ReLikeApplication from './components/ReLikeApplication';

import '../sass/style.sass';

const interval = setInterval(() => {
  const appContainer = document.getElementById('relike-application');

  if (appContainer === null || !window.web3) return false;

  clearInterval(interval);
  ReactDOM.render(<ReLikeApplication />, appContainer);
  return true;
}, 100);
