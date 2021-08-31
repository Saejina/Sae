import axios from 'axios';

export function cleanLocalStorage(): void {
    axios
        .get('http://localhost:5000/login', {})
        .then((response) => {
            console.log(response);
            if (!response.data.loggedIn) {
                localStorage.removeItem('token');
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

export default cleanLocalStorage;
