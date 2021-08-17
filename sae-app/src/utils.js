/* eslint import/namespace: ['error', { allowComputed: true }] */
import * as pages from './pages/index';

export function getPage(path) {
    if (!path) return null;
    let newPath = toString(path);
    newPath = path.substring(0, path.length - 4);
    return pages[newPath];
}

export default getPage;
