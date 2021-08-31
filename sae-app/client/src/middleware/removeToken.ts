export function removeToken(): boolean {
    localStorage.removeItem('saejinaToken');
    return true;
}

export default removeToken;
