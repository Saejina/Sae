const {
    compare,
} = require('bcryptjs');
const token = require('../mware/token');

exports.handleLogin = async function (req, res) {
    const { username } = req.body;
    const { password } = req.body;

    global.database.query('SELECT * FROM platformUsers WHERE username = ?', [username], async (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send({ msg: 'internal server error' });
        } else if (results.length > 0) {
            const comparision = await compare(password, results[0].password);
            if (comparision) {
                const userToken = token.generate({ username: results[0].username, discordId: results[0].discord_id });
                const user = results[0];
                req.session.user = user;
                req.session.userToken = userToken;
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
    if (req.session.user && token.authenticate(req.session.userToken)) {
        res.status(200).send({
            loggedIn: true,
            user: {
                username: req.session.user.username,
                discord_id: req.session.user.discord_id,
                id: req.session.user.id,
            },
        });
    } else res.status(200).send({ loggedIn: false });
};
