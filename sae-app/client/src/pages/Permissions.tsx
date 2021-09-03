import React, {useState, useEffect} from 'react';
import AppLayout from '../components/AppLayout';
import { Redirect, withRouter } from 'react-router-dom';
import useDiscordData from '../hooks/useDiscordData';
import usePermissions from '../hooks/usePermissions';
import PrivateComponent from '../components/PrivateComponent';


export function Permissions(): JSX.Element {
    const permissions = usePermissions();
    const discordData = useDiscordData();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(!permissions);
    }, [setIsLoading, permissions])
    return (
        <AppLayout data={discordData} >
            <PrivateComponent neededPermission="administrator" openedChildren={<Redirect to="/" />} ><>Perms</></PrivateComponent>
        </AppLayout>
    )
}

export default withRouter(Permissions);
