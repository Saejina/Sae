import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router';
import isLoggedIn from '../middleware/isLoggedIn';
import PrivateComponent from './PrivateComponent';

export function PrivateRoute({ neededPermission, ...routeProps }: PrivateRouteProps): JSX.Element {
    return isLoggedIn() ? (
        <PrivateComponent neededPermission={neededPermission} openedChildren={<Redirect to="/" />}>
            <Route {...routeProps} />
        </PrivateComponent>
    ) : (
        <Redirect to="/" />
    );
}

export interface PrivateRouteProps extends RouteProps {
    neededPermission?: string;
}

export default PrivateRoute;
