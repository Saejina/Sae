const requireAll = require('require-all');
const path = require('path');
const reload = require('../functions/reloadCMD');
const manip = require('../utils/jsonManip');
const fs = require('fs');

async function addMessagesToCache(client) {
    const files = fs.existsSync(`${__dirname}/../data/reactionroles`) ? requireAll({
        dirname: `${__dirname}/../data/reactionroles`,
        filter: /^(?!-)(.+)\.json$/,
    }) : [];
    const messages = Object.keys(files);
    const tickets = fs.existsSync() ? await manip.readJsonFile(path.join(__dirname, '..', 'data/reactionTickets.json'))
    .catch((err) => {
        console.log(`[SAE-BOT][ERROR] ${err}`);
    }) : null;
    messages.forEach((mess) => {
        client.channels.fetch(files[mess].channel).then((channel) => {
            channel.messages.fetch(files[mess]);
        });
    });
    if (tickets && tickets.length > 0) {
        tickets.forEach((ticket) => {
            client.channels.fetch(ticket.channel).then((channel) => {
                channel.messages.fetch(ticket.messages);
            });
        });
    }
}

module.exports = (client) => {
    console.log(`\n[SAE-BOT] Logged in as ${client.user.tag}!`);
    global.client.channels.fetch('893856260137566358');
    addMessagesToCache(client);
    reload.reload();
};
