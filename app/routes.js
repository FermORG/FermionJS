import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CorePage from './containers/CorePage';

export default () => (
  <App>
    <Switch>
      <Route path="/core" component={CorePage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
