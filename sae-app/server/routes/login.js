const {
    compare
} = require('bcryptjs');

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
                // const token = mware.generateToken({ username: username });
                console.log("Login successful!");
                req.session.user = results[0];
                console.log(req.session.user);
                res.status(200).send({msg: "Valid credentials !"});
            } else {
                console.log("Login failed!");
                res.status(400).send({ msg: 'Invalid credentials' });
            }
        } else {
            console.log("Login error.");
            res.status(400).send({ msg: 'Internal error' });
        }
    });
}

exports.isLoggedIn = async function (req, res) {
    if (req.session.user)
        res.send({
            loggedIn: true,
            user: {
                username: req.session.user.username,
                discord_id: req.session.user.discord_id,
                id: req.session.user.id,
            }
        });
    else
        res.send({loggedIn: false});
}