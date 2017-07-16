import React, { Component } from 'react';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import rootReducer from '../reducers/index';

import Nav from './Nav';
import routeConfig from '../utils/routing/routeConfig';

export default class Application extends Component {
  constructor(props, context) {
    super(props, context);
    this.createStore();
  }

  createStore() {
    this.store = createStore(
      rootReducer,
      applyMiddleware(thunk),
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
