import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import Commands from "./pages/commands/Commands";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <div>
        <div className="container">
          <div className="sidebarContainer">
            <Sidebar />
          </div>
          <div className="rightSide">
            <Topbar />
            <Switch>
              <Route path="/users"><Users /></Route>
              <Route path="/commands"><Commands /></Route>
              <Route path="/"><Home /></Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
