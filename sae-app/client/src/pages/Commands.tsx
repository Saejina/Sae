import React from 'react';
import AppLayout from '../components/AppLayout';
import Poll from '../components/Poll';
import { withRouter } from 'react-router-dom';
import useDiscordData from '../hooks/useDiscordData';

export function Commands(): JSX.Element {
    const discordData = useDiscordData();
    return (
        <AppLayout data={discordData}>
            <div className="flex">
                <Poll />
            </div>
        </AppLayout>
    );
}

export default withRouter(Commands);
