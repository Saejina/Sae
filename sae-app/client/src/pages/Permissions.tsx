import React from 'react';
import AppLayout from '../components/AppLayout';
import UserCard from '../components/UserCard';
import { Redirect, withRouter } from 'react-router-dom';
import useDiscordData from '../hooks/useDiscordData';
import useDiscordIds from '../hooks/useDiscordIds';
import PrivateComponent from '../components/PrivateComponent';

/*
type permission = {
    key: string;
    value: boolean;
};

function extractPermissions(user: any): permission[] {
    const perms: permission[] = [];
    Object.keys(user).forEach((key) => {
        if ((user[key] === 1 || user[key] === 0) && key !== 'id') {
            perms.push({ key: key, value: user[key] });
        }
    });
    return perms;
}*/

export function Permissions(): JSX.Element {
    const discordData = useDiscordData();
    const discordIds = useDiscordIds();

    return (
        <AppLayout data={discordData}>
            <PrivateComponent neededPermission="administrator" openedChildren={<Redirect to="/" />}>
                <div className="flex flex-wrap justify-around">
                    {discordIds.map((id: any, index: number) => {
                        return <UserCard id={id.discord_id} key={'user-' + index} />;
                    })}
                </div>
            </PrivateComponent>
        </AppLayout>
    );
}

export default withRouter(Permissions);
