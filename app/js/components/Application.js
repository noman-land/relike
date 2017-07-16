import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import rootReducer from '../reducers/rootReducer';

import Dashboard from './Dashboard';
import Nav from './Nav';
import SearchPage from './SearchPage';

import { Routes } from '../constants';

import { path } from '../utils/routing/routingUtils';

export default class Application extends Component {
  constructor(props, context) {
    super(props, context);
    this.store = createStore(rootReducer);
  }

  render() {
    return (
      <Provider store={this.store}>
        <BrowserRouter>
          <div className="flex-column p-4">
            <Nav />
            <Route exact path={path()} component={Dashboard} />
            <Route path={path(Routes.SEARCH)} component={SearchPage} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
