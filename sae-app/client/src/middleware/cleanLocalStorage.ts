import axios from 'axios';

export function cleanLocalStorage(): void {
    axios
        .get('http://localhost:5000/login', { params: { token: localStorage.getItem('saejinaToken') } })
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
