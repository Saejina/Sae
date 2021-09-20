import { useState, useEffect } from 'react';
import isLoggedIn from '../middleware/isLoggedIn';
import getPermissions from '../middleware/getPermissions';

export default function usePermissions(id?: string): any {
    const [permissions, setPermissions] = useState(undefined);
    useEffect(() => {
        if (isLoggedIn()) getPermissions(setPermissions, id);
    }, [setPermissions]);
    return [permissions, setPermissions];
}
