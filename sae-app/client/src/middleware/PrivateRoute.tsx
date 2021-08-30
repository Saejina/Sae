import React from 'react'
import { RouteProps, Route, Redirect } from 'react-router'
import isLoggedIn from './isLoggedIn'

export function PrivateRoute({...routeProps}) {
    return (
        isLoggedIn() ? <Route {...routeProps} /> : <Redirect to='/' />
    )
}

export interface PrivateRouteProps extends RouteProps {}

export default PrivateRoute;
