const token = require('../mware/token');

exports.getUser = (req, res) => {
    const userToken = req.query.token;
    if (!userToken) return res.status(200).send({ msg: 'No token provided' });
    if (token.authenticate(userToken)) {
        const userInfo = token.decode(userToken);
        return global.client.users.fetch(userInfo.discordId).then((user) => {
            if (!user) return res.status(200).send({ msg: 'User not found' });
            return res.status(200).send({
                username: user.username,
                id: userInfo.id,
                discord_id: user.id,
                profilePic: user.avatarURL(),
            });
        }).catch((err) => { res.status(200).send({ msg: 'Internal server error' }); console.log(err); });
    }
    return res.status(200).send({ msg: 'You need to login first' });
};

exports.getServers = async (req, res) => {
    const userToken = req.query.token;
    if (!userToken) return res.status(200).send({ msg: 'No token provided' });
    if (token.authenticate(userToken)) {
        const Guilds = global.client.guilds.cache.map((guild) => (
            { id: guild.id, name: guild.name, serverPic: guild.iconURL() }
        ));
        return res.status(200).send({ servers: Guilds });
    }
    return res.status(200).send({ msg: 'You need to login first' });
};

exports.getInfoById = (req, res, id) => global.client.users.fetch(id).then((user) => {
    if (!user) return res.status(200).send({ msg: 'User not found' });
    return global.database.query('SELECT * FROM platformUsers WHERE discord_id = ?', [id],
        (err, results) => {
            if (err || results.length === 0) {
                return res.status(200).send({
                    username: user.username,
                    discord_id: user.id,
                    id: '',
                    profilePic: user.avatarURL(),
                });
            }
            return res.status(200).send({
                username: user.username,
                discord_id: user.id,
                id: results[0].id,
                profilePic: user.avatarURL(),
            });
        });
});

exports.getIds = (req, res) => {
    global.database.query('SELECT discord_id FROM platformUsers', (err, results) => {
        if (err) { return res.status(200).send([]); }
        return res.status(200).send(results);
    });
};
