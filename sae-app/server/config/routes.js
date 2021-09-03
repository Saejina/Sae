const { handleLogin, isLoggedIn } = require('../routes/login');
const discord = require('../routes/discord');
const perms = require('../routes/perms');

exports.create = (app) => {
    app.post('/login', (req, res) => handleLogin(req, res));

    app.get('/login', (req, res) => isLoggedIn(req, res));

    app.get('/discord/user', (req, res) => discord.getUser(req, res));

    app.get('/discord/servers', (req, res) => discord.getServers(req, res));

    app.get('/perms/all', (req, res) => perms.getAll(req, res));

    app.get('/perms', (req, res) => perms.get(req, res));

    app.put('/perms', (req, res) => perms.edit(req, res));

    app.post('/perms', (req, res) => perms.edit(req, res));
};
