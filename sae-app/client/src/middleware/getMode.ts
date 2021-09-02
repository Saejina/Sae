export function getMode(): 'light' | 'dark' {
    return localStorage.theme || 'light';
}

export default getMode;
