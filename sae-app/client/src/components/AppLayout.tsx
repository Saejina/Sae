import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { children } from '../types';

export function AppLayout({ children, data }: AppLayoutProps): JSX.Element {
    const path = useLocation().pathname;

    return (
        <div className="flex flex-col bg-dark">
            <Topbar data={data}></Topbar>
            <div className="flex">
                <Sidebar active={path}></Sidebar>
                {children}
            </div>
        </div>
    );
}

export interface AppLayoutProps {
    children?: children;
    data?: any;
}

export default AppLayout;
