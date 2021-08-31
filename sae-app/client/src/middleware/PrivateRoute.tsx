import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router';
import isLoggedIn from './isLoggedIn';

export function PrivateRoute({ ...routeProps }: PrivateRouteProps): JSX.Element {
    return isLoggedIn() ? <Route {...routeProps} /> : <Redirect to="/" />;
}

export type PrivateRouteProps = RouteProps;

export default PrivateRoute;
