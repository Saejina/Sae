import axios from 'axios';

export async function getDiscordData(setDiscordData: Function): Promise<void> {
    axios
        .get('http://localhost:5000/discord/user', { params: { token: localStorage.getItem('saejinaToken') } })
        .then((response) => {
            setDiscordData({
                username: response.data.username,
                id: response.data.id,
                profilePic: response.data.profilePic,
            });
        });
}

export default getDiscordData;
