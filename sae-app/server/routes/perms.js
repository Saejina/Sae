const token = require('../mware/token');

function permsToString(perms) {
    const newArray = [];
    Object.keys(perms).forEach((key) => {
        if (perms[key] === 1) {
            newArray.push(key);
        }
    });
    return (newArray);
}

exports.getAll = (req, res) => global.database.query('SELECT * FROM platformUsers, platformPerms WHERE (platformUsers.id = platformPerms.id)', [],
    (error, users) => {
        if (error) {
            console.log(error);
            return res.status(500).send({ msg: 'Internal server error' });
        }
        return res.status(200).send(users);
    });

exports.get = (req, res) => {
    const userToken = req.query.token;
    if (!userToken) { return res.status(200).send({ msg: 'No token provided' }); }
    if (token.authenticate(userToken)) {
        const userInfo = token.decode(userToken);
        return global.database.query('SELECT * FROM platformPerms WHERE id = ?', [userInfo.id],
            (err, users) => {
                if (err) { return res.status(500).send({ msg: 'Internal server error' }); }
                if (users.length > 0) {
                    const perms = permsToString(users[0]);
                    return res.status(200).send({ permissions: perms });
                }
                return res.status(200).send({ msg: 'You need to login first' });
            });
    }
    return res.status(200).send({ msg: 'You need to login first' });
};

exports.getById = (req, res, id) => global.database.query('SELECT * FROM platformPerms where id = ?', [id],
    (err, users) => {
        if (err) { return res.status(500).send({ msg: 'Internal server error' }); }
        if (users.length > 0) {
            const perms = permsToString(users[0]);
            return res.status(200).send({ permissions: perms });
        }
        return res.status(200).send({ permissions: [] });
    });

exports.edit = (req, res, id) => {
    const newPerms = req.body.params;
    global.database.query('UPDATE platformPerms set ? where id = ?', [newPerms, id], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ msg: 'Internal server error' });
        }
        return res.status(200).send({ msg: 'Permissions updated successfully' });
    });
};
