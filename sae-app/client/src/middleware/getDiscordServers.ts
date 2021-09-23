import axios from 'axios';

export default async function getDiscordServers(setDiscordServers: Function): Promise<void> {
    axios
        .get(process.env.REACT_APP_API_ADDRESS + '/discord/servers', {
            params: { token: localStorage.getItem('saejinaToken') },
        })
        .then((response) => {
            setDiscordServers(response.data.servers);
        });
}
