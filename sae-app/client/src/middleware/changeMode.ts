import refresh from '../utils';

export function changeMode(customMode?: 'light' | 'dark'): void {
    const mode = customMode ? customMode : localStorage.theme;
    if (mode === 'light') {
        localStorage.theme = 'dark';
        document.documentElement.classList.add('dark');
        refresh();
    } else {
        localStorage.theme = 'light';
        document.documentElement.classList.remove('dark');
        refresh();
    }
}

export default changeMode;
