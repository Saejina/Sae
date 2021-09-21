import axios from 'axios';

export async function getDiscordData(setDiscordData: Function, id?: string): Promise<void> {
    if (id) {
        axios.get(process.env.REACT_APP_API_ADDRESS + '/discord/user/' + id).then((response) => {
            setDiscordData({
                username: response.data.username,
                id: response.data.discord_id,
                platformId: response.data.id,
                profilePic: response.data.profilePic,
            });
        });
    } else {
        axios
            .get(process.env.REACT_APP_API_ADDRESS + '/discord/user', {
                params: { token: localStorage.getItem('saejinaToken') },
            })
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
