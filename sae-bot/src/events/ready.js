const requireAll = require('require-all');
const path = require('path');
const reload = require('../functions/reloadCMD');
const manip = require('../utils/jsonManip');

const files = requireAll({
    dirname: `${__dirname}/../data/reactionroles`,
    filter: /^(?!-)(.+)\.json$/,
});

async function addMessagesToCache(client) {
    const messages = Object.keys(files);
    const tickets = await manip.readJsonFile(path.join(__dirname, '..', 'data/reactionTickets.json'));
    messages.forEach((mess) => {
        client.channels.fetch(files[mess].channel).then((channel) => {
            channel.messages.fetch(files[mess]);
        });
    });
    tickets.forEach((ticket) => {
        client.channels.fetch(ticket.channel).then((channel) => {
            channel.messages.fetch(ticket.messages);
        });
    });
}

module.exports = (client) => {
    console.log(`\n[SAE-BOT] Logged in as ${client.user.tag}!`);
    global.client.channels.fetch('893856260137566358');
    addMessagesToCache(client);
    reload.reload();
};
