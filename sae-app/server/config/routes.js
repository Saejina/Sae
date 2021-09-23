const { handleLogin, isLoggedIn } = require('../routes/login');
const discord = require('../routes/discord');
const perms = require('../routes/perms');
const commands = require('../routes/commands');

exports.create = (app) => {
    app.post('/login', (req, res) => handleLogin(req, res));

    app.get('/login', (req, res) => isLoggedIn(req, res));

    app.get('/discord/user/:id', (req, res) => {
        discord.getInfoById(req, res, req.params.id);
    });

    app.get('/discord/user', (req, res) => discord.getUser(req, res));

    app.get('/discord/servers', (req, res) => discord.getServers(req, res));

    app.get('/discord/ids', (req, res) => discord.getIds(req, res));

    app.get('/discord/channels/:id', (req, res) => discord.getChannels(req, res, req.params.id));

    app.get('/perms/all', (req, res) => perms.getAll(req, res));

    app.put('/perms/edit/:id', (req, res) => perms.edit(req, res, req.params.id));

    app.get('/perms/:id', (req, res) => perms.getById(req, res, req.params.id));

    app.get('/perms', (req, res) => perms.get(req, res));

    app.post('/commands/poll', (req, res) => commands.poll(req, res));
};
