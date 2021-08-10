import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";

function App() {
  return (
    <div>
      <div className="container">
        <div className="sidebarContainer">
          <Sidebar />
        </div>
        <div className="rightSide">
          <Topbar />
          <Home />
        </div>
        </div>
    </div>
  );
}

export default App;
