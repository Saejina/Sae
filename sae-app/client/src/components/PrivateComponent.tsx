import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import usePermissions from '../hooks/usePermissions';
import useDiscordData from '../hooks/useDiscordData';
import isDark from '../middleware/isDark';
import AppLayout from '../components/AppLayout';

function PrivateComponent({ children, openedChildren, neededPermission }: PrivateComponentProps): JSX.Element {
    const [permissions] = usePermissions();
    const [isLoading, setIsLoading] = useState(true);
    const discordData = useDiscordData();

    useEffect(() => {
        setIsLoading(!permissions);
    }, [setIsLoading, permissions]);
    return neededPermission ? (
        isLoading ? (
            <AppLayout data={discordData}>
                <Spinner animation="border" className={isDark() ? 'bg-dark' : 'bg-lighter'} />
            </AppLayout>
        ) : permissions.includes(neededPermission) || permissions.includes('administrator') ? (
            children
        ) : (
            openedChildren
        )
    ) : (
        children
    );
}

export interface PrivateComponentProps {
    children: JSX.Element;
    openedChildren: JSX.Element;
    neededPermission?: string;
}

export default PrivateComponent;
