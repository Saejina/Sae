const requireAll = require('require-all');
const reload = require('../functions/reloadCMD');

const files = requireAll({
    dirname: `${__dirname}/../reactionroles`,
    filter: /^(?!-)(.+)\.json$/,
});

module.exports = (client) => {
    console.log(`\n[SAE-BOT] Logged in as ${client.user.tag}!`);
    const messages = Object.keys(files);
    messages.forEach((mess) => {
        client.channels.fetch(files[mess].channel).then((channel) => {
            channel.messages.fetch(files[mess]);
        });
    });
    reload.reload();
};
