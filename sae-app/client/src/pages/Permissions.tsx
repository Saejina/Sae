import React from 'react';
import AppLayout from '../components/AppLayout';
import UserPermissionsCard from '../components/UserPermissionsCard';
import { withRouter } from 'react-router-dom';
import useDiscordData from '../hooks/useDiscordData';
import useDiscordIds from '../hooks/useDiscordIds';

export function Permissions(): JSX.Element {
    const discordData = useDiscordData();
    const discordIds = useDiscordIds();

    return (
        <AppLayout data={discordData}>
            <div className="flex flex-wrap justify-around">
                {discordIds.map((id: any, index: number) => {
                    return <UserPermissionsCard id={id.discord_id} key={'user-' + index} />;
                })}
            </div>
        </AppLayout>
    );
}

export default withRouter(Permissions);
