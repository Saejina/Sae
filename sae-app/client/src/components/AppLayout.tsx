import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useLocation } from 'react-router-dom';
import { children } from '../types';

export function AppLayout({ children }: AppLayoutProps): JSX.Element {
    const path = useLocation().pathname;
    return (
        <div className="flex flex-col bg-dark">
            <Topbar></Topbar>
            <div className="flex">
                <Sidebar active={path}></Sidebar>
                {children}
            </div>
        </div>
    );
}

export interface AppLayoutProps {
    children?: children;
}

export default AppLayout;
