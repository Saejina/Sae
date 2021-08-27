import React from 'react';
import routes from './configs/routes';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {PrivateRoute} from './middleware/PrivateRoute'

function App(): JSX.Element {
    return (
        <Router>
            <Switch>
                {routes.map(({ path, page }, index) => {
                    return <PrivateRoute key={index} path={path} component={page} exact />;
                })}
                <Redirect to="/404" />
            </Switch>
        </Router>
    );
}

export default App;
