import axios from 'axios';

export default async function getDiscordChannels(setDiscordChannels: Function, serverId: string): Promise<void> {
    axios
        .get(process.env.REACT_APP_API_ADDRESS + '/discord/channels/' + serverId, {
            params: { token: localStorage.getItem('saejinaToken') },
        })
        .then((response) => {
            setDiscordChannels(response.data.channels);
        });
}
