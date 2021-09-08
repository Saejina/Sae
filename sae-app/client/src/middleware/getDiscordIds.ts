import axios from 'axios';

export default async function getDiscordIds(setDiscordIds: Function): Promise<void> {
    axios.get('http://localhost:5000/discord/ids').then((response) => {
        setDiscordIds(response.data);
    });
}
