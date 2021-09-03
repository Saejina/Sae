const token = require('../mware/token');

function permsToString(perms) {
    const newPerms = JSON.parse(perms);
    const newArray = [];
    Object.keys(newPerms).forEach((key) => {
        if (newPerms[key] === true) {
            newArray.push(key);
        }
    });
    return (newArray);
}

exports.getAll = (req, res) => {
    global.database.query('SELECT * FROM platformUsers', [],
        (error, users) => {
            if (error) {
                console.log(error);
                res.status(500).send({ msg: 'Internal server error' });
            } else {
                const perms = users.map((user) => global.database.query('SELECT * FROM platformPerms where id = ?', [user.id],
                    (err, userPerms) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).send({ msg: 'Internal server error' });
                        }
                        return ({
                            user,
                            permissions: userPerms[0] ? userPerms[0].permissions : {},
                        });
                    }));
                res.status(200).send(perms || []);
            }
        });
    return res.status(200).send({ msg: 'You need to login first' });
};

exports.get = (req, res) => {
    const userToken = req.query.token;
    if (!userToken) { return res.status(200).send({ msg: 'No token provided' }); }
    if (token.authenticate(userToken)) {
        const userInfo = token.decode(userToken);
        global.database.query('SELECT * FROM platformPerms WHERE id = ?', [userInfo.id],
            (err, users) => {
                if (err) { return res.status(500).send({ msg: 'Internal server error' }); }
                if (users.length > 0) {
                    const perms = permsToString(users[0].permissions);
                    return res.status(200).send({ permissions: perms });
                }
                return res.status(200).send({ msg: 'You need to login first' });
            });
    } else {
        return res.status(200).send({ msg: 'You need to login first' });
    }
};

exports.edit = (req, res) => {

};

exports.has = (req, res) => {

};
