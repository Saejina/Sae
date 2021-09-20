import axios from 'axios';

export async function getDiscordData(setDiscordData: Function, id?: string): Promise<void> {
    if (id) {
        axios.get('http://localhost:5000/discord/user/' + id).then((response) => {
            setDiscordData({
                username: response.data.username,
                id: response.data.discord_id,
                platformId: response.data.id,
                profilePic: response.data.profilePic,
            });
        });
    } else {
        axios
            .get('http://localhost:5000/discord/user', { params: { token: localStorage.getItem('saejinaToken') } })
            .then((response) => {
                setDiscordData({
                    username: response.data.username,
                    id: response.data.discord_id,
                    platformId: response.data.id,
                    profilePic: response.data.profilePic,
                });
            });
    }
}

export default getDiscordData;
