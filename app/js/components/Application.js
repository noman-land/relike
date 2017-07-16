import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import rootReducer from '../reducers/rootReducer';

import Nav from './Nav';
import routeConfig from '../utils/routing/routeConfig';

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
            {renderRoutes(routeConfig)}
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
