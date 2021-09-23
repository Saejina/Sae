import axios from 'axios';

export default async function getDiscordIds(setDiscordIds: Function): Promise<void> {
    axios.get(process.env.REACT_APP_API_ADDRESS + '/discord/ids').then((response) => {
        setDiscordIds(response.data);
    });
}
