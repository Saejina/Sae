import axios from 'axios';

export default async function getDiscordServers(setDiscordServers: Function): Promise<void> {
    axios
        .get('http://localhost:5000/discord/servers', { params: { token: localStorage.getItem('saejinaToken') } })
        .then((response) => {
            setDiscordServers(response.data.servers);
        });
}
