import React, { Component } from 'react';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import ReLikeMiddleware from 'relike-redux-middleware';
import createHistory from 'history/createBrowserHistory';

import rootReducer from '../reducers/index';

import Nav from './Nav';
import routeConfig from '../utils/routing/routeConfig';

export default class Application extends Component {
  constructor(props, context) {
    super(props, context);
    this.createStore();
    window.ReLike = this;
  }

  createStore() {
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    /* eslint-enable */

    this.history = createHistory();

    this.store = createStore(
      rootReducer,
      composeEnhancers(
        applyMiddleware(
          thunk,
          ReLikeMiddleware,
          routerMiddleware(this.history),
        ),
      ),
    );
  }

  render() {
    return (
      <Provider store={this.store}>
        <ConnectedRouter history={this.history}>
          <div className="flex-column p-4">
            <Nav />
            {renderRoutes(routeConfig)}
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
