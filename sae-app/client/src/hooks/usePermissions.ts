import { useState, useEffect } from 'react';
import isLoggedIn from '../middleware/isLoggedIn';
import getPermissions from '../middleware/getPermissions';

export default function usePermissions(): any {
    const [permissions, setPermissions] = useState(undefined);
    useEffect(() => {
        if (isLoggedIn()) getPermissions(setPermissions);
    }, [setPermissions]);
    return permissions;
}
