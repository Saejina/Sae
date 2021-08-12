import './sidebar.css';
import {Face, Adb, Home} from '@material-ui/icons';
import Logo from '../Logo/Logo';
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router';
import clsx from 'clsx';

export default function Sidebar() {
  const location = useLocation();
  return (
    <div className="sidebar">
      <div className="sidebarLogo">
        <span>Saejina</span>
      </div>
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="sidebarListItemLink">
              <li className={clsx('sidebarListItem', location.pathname === '/' ? 'active' : '')}>
                <Home className="sidebarIcon"/>
                                Home
              </li>
            </Link>
            <Link to="/users" className="sidebarListItemLink">
              <li className={clsx('sidebarListItem', location.pathname === 'users/' ? 'active' : '')}>
                <Face className="sidebarIcon"/>
                                Utilisateurs
              </li>
            </Link>
            <Link to="/commands" className="sidebarListItemLink">
              <li className={clsx('sidebarListItem', location.pathname === '/commands' ? 'active' : '')}>
                <Adb className="sidebarIcon"/>
                                Commandes
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
