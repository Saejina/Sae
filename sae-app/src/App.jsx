import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import './app.css';
import { routes } from './routes';
import { getPage } from './utils';

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    {routes.map((route) => (
                        <Route key="route" path={route.path}>
                            {getPage(route.page)}
                        </Route>
                    ))}
                </Switch>
            </div>
        </Router>
    );
}

export default App;
