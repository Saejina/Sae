import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useLocation } from 'react-router-dom';
import { children } from '../types';

export function AppLayout({ children }: AppLayoutProps): JSX.Element {
    const path = useLocation().pathname;
    console.log(path);
    return (
        <div className="bg-dark">
            <Topbar></Topbar>
            <Sidebar active={path}></Sidebar>
            {children}
        </div>
    );
}

export interface AppLayoutProps {
    children?: children;
}

export default AppLayout;
