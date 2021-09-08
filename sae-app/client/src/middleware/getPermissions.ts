import axios from 'axios';

export default async function getPermissions(setPermissions: Function, id?: string): Promise<void> {
    if (id) {
        axios
            .get('http://localhost:5000/perms/' + id) //TODO
            .then((response) => {
                setPermissions(response.data.permissions);
            });
    } else {
        axios
            .get('http://localhost:5000/perms', { params: { token: localStorage.getItem('saejinaToken') } })
            .then((response) => {
                setPermissions(response.data.permissions);
            });
    }
}
