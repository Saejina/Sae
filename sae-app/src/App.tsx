import React from 'react';
import routes from './configs/routes';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App(): JSX.Element {
    return (
        <Router>
            <Switch>
                {routes.map(({ path, page }, index) => {
                    return <Route key={index} path={path} component={page} />;
                })}
            </Switch>
        </Router>
    );
}

export default App;
