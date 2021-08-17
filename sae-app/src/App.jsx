import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import Home from './pages/home/Home';
import Users from './pages/users/Users';
import Commands from './pages/commands/Commands';

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/users"><Users /></Route>
                    <Route path="/commands"><Commands /></Route>
                    <Route path="/"><Home /></Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
