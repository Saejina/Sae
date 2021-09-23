import axios from 'axios';

export default async function getPermissions(setPermissions: Function, id?: string): Promise<void> {
    if (id) {
        axios
            .get(process.env.REACT_APP_API_ADDRESS + '/perms/' + id) //TODO
            .then((response) => {
                setPermissions(response.data.permissions);
            });
    } else {
        axios
            .get(process.env.REACT_APP_API_ADDRESS + '/perms', {
                params: { token: localStorage.getItem('saejinaToken') },
            })
            .then((response) => {
                setPermissions(response.data.permissions);
            });
    }
}
