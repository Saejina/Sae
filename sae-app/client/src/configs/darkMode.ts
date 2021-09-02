export function darkModeConfig(): void {
    let theme = 'light';
    if (localStorage.theme) {
        theme = localStorage.theme;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme = 'dark';
    }
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

export default darkModeConfig;
