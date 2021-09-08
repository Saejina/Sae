import { useState, useEffect } from 'react';
import isLoggedIn from '../middleware/isLoggedIn';
import getDiscordData from '../middleware/getDiscordData';

export default function useDiscordData(id?: string): any {
    const defaultData = { username: '', id: '', profilePic: '' };
    const [discordData, setDiscordData] = useState(defaultData);
    useEffect(() => {
        if (isLoggedIn()) getDiscordData(setDiscordData, id);
    }, [setDiscordData]);
    return discordData;
}
