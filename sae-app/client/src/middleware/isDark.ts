export const isDark = (): boolean => {
    if (document.documentElement.classList.contains('dark')) {
        return true;
    }
    return false;
};

export default isDark;
