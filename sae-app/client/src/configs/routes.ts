import * as pages from '../pages';

const routes = [
    { path: '/users', page: pages['Users'] },
    { path: '/commands', page: pages['Commands'] },
    { path: '/404', page: pages['NotFound'] },
    { path: '/', page: pages['Home'] },
];

export default routes;
