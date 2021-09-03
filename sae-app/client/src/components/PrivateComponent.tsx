import React, {useState, useEffect, Component} from 'react';
import {Spinner} from 'react-bootstrap';
import usePermissions from '../hooks/usePermissions';
import {children} from '../types';

function PrivateComponent({children, openedChildren, neededPermission}: PrivateComponentProps): JSX.Element {
    const permissions = usePermissions();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(!permissions);
    }, [setIsLoading, permissions])
    return isLoading ? <Spinner animation="border" /> : (
        permissions.includes(neededPermission) ? children : openedChildren
    )
}

export interface PrivateComponentProps {
    children: JSX.Element;
    openedChildren: JSX.Element;
    neededPermission: string;
}

export default PrivateComponent
