import "./sidebar.css"
import {Face, Adb, Home} from "@material-ui/icons"
import Logo from "../Logo/Logo"

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarLogo">
                <span>Saejina</span>
            </div>
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <Home className="sidebarIcon"/>
                            Home
                        </li>
                        <li className="sidebarListItem">
                            <Face className="sidebarIcon"/>
                            Utilisateurs
                        </li>
                        <li className="sidebarListItem">
                            <Adb className="sidebarIcon"/>
                            Commandes
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
