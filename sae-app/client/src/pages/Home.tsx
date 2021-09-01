import { useEffect, useState } from 'react';
import { AppLayout } from '../components/AppLayout';
import { withRouter } from 'react-router-dom';
import getDiscordData from '../middleware/getDiscordData';
import isLoggedIn from '../middleware/isLoggedIn';

export function Home(): JSX.Element {
    const defaultData = { username: '', id: '', profilePic: '' };
    const [discordData, setDiscordData] = useState(defaultData);
    useEffect(() => {
        if (isLoggedIn()) getDiscordData(setDiscordData);
    }, [setDiscordData]);
    return <AppLayout data={discordData}>Welcome {discordData.username} !</AppLayout>;
}

export default withRouter(Home);
