import { useState, useEffect } from 'react';
import isLoggedIn from '../middleware/isLoggedIn';
import getAllPermissions from '../middleware/getAllPermissions';

export default function useAllPermissions(): any {
    const defaultData = [{ id: '', username: '', permissions: {} }];
    const [allPermissions, setAllPermissions] = useState(defaultData);
    useEffect(() => {
        if (isLoggedIn()) getAllPermissions(setAllPermissions);
    }, [setAllPermissions]);
    return allPermissions;
}
