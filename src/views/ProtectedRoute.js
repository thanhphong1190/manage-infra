import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LoginRedirect from './LoginRedirect';
import Session from "../helpers/session";

export default class ProtectedRoute extends Component {
  render() {
    const { path, exact, component, key } = this.props;
    const token = Session.getAccessToken();
    return (
      <Route
        path={path}
        exact={exact}
        component={token ? component : LoginRedirect}
        key={key}
      />
    );
  }
}
