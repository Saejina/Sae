import axios from 'axios';

export default async function getPermissions(setPermissions: Function): Promise<void> {
    axios
        .get('http://localhost:5000/perms', { params: { token: localStorage.getItem('saejinaToken') } })
        .then((response) => {
            console.log(response);
            setPermissions(response.data.permissions);
        });
}
