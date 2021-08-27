import Axios from 'axios'

export async function isLoggedIn(): Promise<boolean> {
    const response = await Axios.get('http://localhost:5000/login');
    return new Promise((resolve, reject) => {
        if (!response)
            reject(false);
        if (response.data.loggedIn)
            resolve(true);
        else
            reject(false);
    })
}