import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';

import rootReducer from '../reducers/rootReducer';

import Dashboard from './Dashboard';
import Nav from './Nav';
import SearchPage from './SearchPage';

export default class Application extends Component {
  constructor() {
    super();
    this.store = createStore(rootReducer);
  }

  render() {
    return (
      <Provider store={this.store}>
        <BrowserRouter>
          <div className="flex-column p-4">
            <Nav />
            <Route exact path="/" component={Dashboard} />
            <Route path="/search" component={SearchPage} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
