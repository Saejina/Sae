const jwt = require('jsonwebtoken');

exports.generate = (payload) => jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' });

exports.authenticate = function (token) {
    if (!token) return false;
    return jwt.verify(token, process.env.SECRET, (err) => {
        if (err) return false;
        return true;
    });
};

exports.decode = function (token) {
    return jwt.decode(token, { json: true });
};
