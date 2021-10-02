const requireAll = require('require-all');

module.exports = (emoji, msgId) => new Promise((resolve, reject) => {
    const files = requireAll({
        dirname: `${__dirname}/../data/reactionroles`,
        filter: /^(?!-)(.+)\.json$/,
    });
    const keys = Object.keys(files);
    if (!keys.includes(msgId)) reject(new Error('Emoji already exists'));
    const ref = emoji.id ? emoji.id : emoji.name;
    files[msgId].roles.forEach((role) => {
        if (role.emoji === ref) {
            resolve(true);
        }
    });
    reject(new Error('Emoji already exists'));
});
