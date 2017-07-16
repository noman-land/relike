import React from 'react';
import ReactDOM from 'react-dom';

import ReLikeDashboard from './components/ReLikeDashboard';

import '../sass/style.sass';

const interval = setInterval(() => {
  const appContainer = document.getElementById('relike-application');

  if (appContainer === null || !window.web3) return false;

  clearInterval(interval);
  ReactDOM.render(<ReLikeDashboard />, appContainer);
  return true;
}, 100);
