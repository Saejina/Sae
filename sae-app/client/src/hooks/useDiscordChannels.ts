import { useState, useEffect } from 'react';
import isLoggedIn from '../middleware/isLoggedIn';
import getDiscordChannels from '../middleware/getDiscordChannels';

export default function useDiscordChannels(id: string): any {
    const defaultData = [{ id: '', name: '', category: '' }];
    const [discordChannels, setDiscordChannels] = useState(defaultData);
    useEffect(() => {
        if (isLoggedIn()) getDiscordChannels(setDiscordChannels, id);
    }, [setDiscordChannels]);
    return discordChannels;
}
