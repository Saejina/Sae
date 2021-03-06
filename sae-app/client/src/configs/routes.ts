import * as pages from '../pages';

const routes = [
    { path: '/users', page: pages['Users'], secured: true, permission: 'community' },
    { path: '/commands', page: pages['Commands'], secured: true, permission: 'commands' },
    { path: '/permissions', page: pages['Permissions'], secured: true, permission: 'administrator' },
    { path: '/', page: pages['Home'] },
    { path: '/404', page: pages['NotFound'] },
];

export default routes;
