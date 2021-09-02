import { useState, useEffect } from 'react';
import isLoggedIn from '../middleware/isLoggedIn';
import getDiscordServers from '../middleware/getDiscordServers';

export default function useDiscordData(): any {
    const defaultData = [{ id: '', name: '', serverPic: '' }];
    const [discordServers, setDiscordServers] = useState(defaultData);
    useEffect(() => {
        if (isLoggedIn()) getDiscordServers(setDiscordServers);
    }, [setDiscordServers]);
    return discordServers;
}
