import cleanLocalStorage from "./cleanLocalStorage";

function isLoggedIn() {
    cleanLocalStorage();
    if (!localStorage.getItem('saejinaToken'))
        return false;
    else
        return true;
}

export default isLoggedIn;