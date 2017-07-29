import React, { Component } from 'react';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import ReLikeMiddleware from 'relike-redux-middleware';

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
    this.store = createStore(
      rootReducer,
      composeEnhancers(
        applyMiddleware(thunk, ReLikeMiddleware),
      ),
    );
  }

  render() {
    return (
      <Provider store={this.store}>
        <BrowserRouter>
          <div className="flex-column p-4">
            <Nav />
            {renderRoutes(routeConfig)}
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
