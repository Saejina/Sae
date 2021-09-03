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
                id: user.id,
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
