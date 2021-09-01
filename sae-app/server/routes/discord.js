const token = require('../mware/token');

exports.get = (req, res) => {
    const userToken = req.query.token;
    if (!userToken) return res.status(200).send({ msg: 'No token provided' });
    if (req.session.user) {
        const discordId = req.session.user.discord_id;
        return global.client.users.fetch(discordId).then((user) => {
            if (!user) return res.status(200).send({ msg: 'User not found' });
            return res.status(200).send({
                username: user.username,
                id: discordId,
                profilePic: user.avatarURL(),
            });
        }).catch((err) => { res.status(200).send({ msg: 'Internal server error' }); console.log(err); });
    }
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
