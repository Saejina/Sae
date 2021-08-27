import * as pages from '../pages';

const routes = [
    { path: '/users', page: pages['Users'] },
    { path: '/commands', page: pages['Commands'] },
    { path: '/login', page: pages['Login'] },
    { path: '/404', page: pages['NotFound'] },
    { path: '/', page: pages['Home'] },
];

export default routes;
