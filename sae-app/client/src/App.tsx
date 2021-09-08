import React, { useEffect } from 'react';
import routes from './configs/routes';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import PrivateRoute from './components/PrivateRoute';
import cleanLocalStorage from './middleware/cleanLocalStorage';
import theme from './configs/mui-theme';

function App(): JSX.Element {
    useEffect(() => {
        cleanLocalStorage();
    });
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    {routes.map(({ path, page, secured }, index) => {
                        if (secured) return <PrivateRoute key={index} path={path} component={page} exact />;
                        else return <Route key={index} path={path} component={page} exact />;
                    })}
                    <Redirect to="/404" />
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
