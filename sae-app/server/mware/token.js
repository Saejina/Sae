const jwt = require('jsonwebtoken');

exports.generate = (username) => jwt.sign(username, process.env.SECRET, { expiresIn: '24h' });

exports.authenticate = function (token) {
    if (!token) return false;
    return jwt.verify(token, process.env.SECRET, (err) => {
        if (err) return false;
        return true;
    });
};
