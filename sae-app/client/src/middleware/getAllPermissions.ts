import axios from 'axios';

export default function getAllPermissions(setAllPermissions: Function): any {
    axios
        .get(process.env.REACT_APP_API_ADDRESS + '/perms/all', {
            params: { token: localStorage.getItem('saejinaToken') },
        })
        .then((response) => {
            setAllPermissions(response.data);
        });
}
