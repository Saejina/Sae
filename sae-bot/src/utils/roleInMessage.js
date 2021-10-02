const requireAll = require('require-all');

module.exports = (roleId, msgId) => new Promise((resolve, reject) => {
    const files = requireAll({
        dirname: `${__dirname}/../data/reactionroles`,
        filter: /^(?!-)(.+)\.json$/,
    });
    const keys = Object.keys(files);
    if (!keys.includes(msgId)) reject(new Error('Role already exists'));
    files[msgId].roles.forEach((role) => {
        if (role.role === roleId) {
            resolve(true);
        }
    });
    reject(new Error('Role already exists'));
});
