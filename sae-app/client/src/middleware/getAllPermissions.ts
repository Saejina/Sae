import axios from 'axios';

export default function getAllPermissions(setAllPermissions: Function): any {
    axios
        .get('http://localhost:5000/perms/all', { params: { token: localStorage.getItem('saejinaToken') } })
        .then((response) => {
            setAllPermissions(response.data);
        });
}
