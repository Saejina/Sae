import cleanLocalStorage from './cleanLocalStorage';

function isLoggedIn(): boolean {
    cleanLocalStorage();
    if (!localStorage.getItem('saejinaToken')) return false;
    else return true;
}

export default isLoggedIn;
