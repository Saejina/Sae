import React from 'react'
import {Redirect, Route, RouteProps} from 'react-router-dom'
import { isLoggedIn } from "./auth";

export function PrivateRoute({...props}: PrivateRouteProps): JSX.Element {
    let status;
    isLoggedIn().then((result) => { status = result });
    console.log(status);
    if (status) {
        return (
            <Route {...props} />
        )
    } else {
        return (
            <Redirect to="/login" />
        )
    }
}

export interface PrivateRouteProps extends RouteProps {
    path: string;
}

export default PrivateRoute;
