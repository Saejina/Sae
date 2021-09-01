import React from 'react';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { children } from '../types';
import isDark from '../middleware/isDark';

export function AppLayout({ children, data }: AppLayoutProps): JSX.Element {
    const path = useLocation().pathname;

    return (
        <div className={clsx('flex flex-col', isDark() ? 'bg-dark' : 'bg-lighter')}>
            <Topbar data={data} className="shadow-md" />
            <div className="flex mt-16">
                <Sidebar active={path} className="shadow-md" />
                <div className={clsx('mx-1 p-3', isDark() ? 'text-light' : 'text-dark')}>{children}</div>
            </div>
        </div>
    );
}

export interface AppLayoutProps {
    children?: children;
    data: any;
}

export default AppLayout;
