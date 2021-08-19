import React from 'react';
import routes from './configs/routes';
import { NotFound } from './pages';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App(): JSX.Element {
    return (
        <Router>
            <Switch>
                {routes.map(({ path, page }, index) => {
                    return <Route exact key={index} path={path} component={page} />;
                })}
                <Redirect to="/404" />
            </Switch>
        </Router>
    );
}

export default App;
