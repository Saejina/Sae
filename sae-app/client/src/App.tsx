import React, {useEffect} from 'react';
import routes from './configs/routes';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './middleware/PrivateRoute';
import cleanLocalStorage from './middleware/cleanLocalStorage';

function App(): JSX.Element {
    useEffect(() => {
        cleanLocalStorage();
    }, []);
    return (
        <Router>
            <Switch>
                {routes.map(({ path, page, secured }, index) => {
                    if (secured)
                        return <PrivateRoute key={index} path={path} component={page} exact />
                    else
                        return <Route key={index} path={path} component={page} exact />;
                })}
                <Redirect to="/404" />
            </Switch>
        </Router>
    );
}

export default App;
