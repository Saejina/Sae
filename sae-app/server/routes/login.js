const {
    compare,
} = require('bcryptjs');
const token = require('../mware/token');

exports.handleLogin = async function (req, res) {
    const { username } = req.body;
    const { password } = req.body;

    global.database.query('SELECT * FROM platformUsers WHERE username = ?',
        [username], async (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).send({ msg: 'internal server error' });
            } else if (results.length > 0) {
                const comparision = await compare(password, results[0].password);
                if (comparision) {
                    const userToken = token.generate({
                        id: results[0].id,
                        username: results[0].username,
                        discordId: results[0].discord_id,
                    });
                    res.status(200).send({ token: userToken, msg: 'Logged in !' });
                } else {
                    res.status(400).send({ msg: 'Invalid credentials' });
                }
            } else {
                res.status(400).send({ msg: 'Invalid credentials' });
            }
        });
};

exports.isLoggedIn = async function (req, res) {
    const userToken = req.query.token;
    if (token.authenticate(userToken)) {
        const userInfo = token.decode(userToken);
        res.status(200).send({
            loggedIn: true,
            user: {
                username: userInfo.username,
                discord_id: userInfo.discord_id,
                id: userInfo.id,
            },
        });
    } else res.status(200).send({ loggedIn: false });
};
