import axios from 'axios';

export function cleanLocalStorage(): void {
    axios
        .get(process.env.REACT_APP_API_ADDRESS + '/login', { params: { token: localStorage.getItem('saejinaToken') } })
        .then((response) => {
            if (!response.data.loggedIn) {
                localStorage.removeItem('saejinaToken');
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

export default cleanLocalStorage;
