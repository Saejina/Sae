import { useState, useEffect } from 'react';
import getDiscordIds from '../middleware/getDiscordIds';

export default function useDiscordIds(): any[] {
    const [discordIds, setDiscordIds] = useState([]);
    useEffect(() => {
        getDiscordIds(setDiscordIds);
    }, [setDiscordIds]);
    return discordIds;
}
