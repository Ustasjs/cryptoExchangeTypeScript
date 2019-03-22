import React, { PureComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIsAuthorized } from '../../reducers/auth';

interface IPrivateRouteProps {
  path: string;
  isAuthorized: boolean;
  component: React.ComponentType<any>;
}

export class PrivateRoute extends PureComponent<IPrivateRouteProps> {
  render() {
    const { isAuthorized, component: Component, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          isAuthorized ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  }
}

export default connect(state => ({
  isAuthorized: getIsAuthorized(state)
}))(PrivateRoute);
