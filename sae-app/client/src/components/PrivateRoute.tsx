import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router';
import isLoggedIn from '../middleware/isLoggedIn';

export function PrivateRoute({ ...routeProps }: RouteProps): JSX.Element {
    return isLoggedIn() ? <Route {...routeProps} /> : <Redirect to="/" />;
}

export default PrivateRoute;
