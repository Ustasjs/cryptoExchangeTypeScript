import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './AppRouter.css';

import AuthPage from '../AuthPage';
import PrivateRoute from '../PrivateRoute';
import MainPage from '../MainPage';

export class AppRouter extends Component {
  render() {
    return (
      <div className="AppRouter">
        <Switch>
          <Route path="/" exact component={AuthPage} />
          <PrivateRoute path="/trade" component={MainPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default AppRouter;
