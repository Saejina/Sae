const requireAll = require('require-all');
const path = require('path');
const fs = require('fs');
const reload = require('../functions/reloadCMD');
const manip = require('../utils/jsonManip');

async function addVoiceChannelsToCache(client) {
    const refChannels = fs.existsSync(`${__dirname}/../data/voiceChat.json`) ? await manip.readJsonFile(path.join(__dirname, '..', 'data/voiceChat.json'))
        .catch((err) => console.log(`[SAE-BOT][ERROR] ${err}`)) : null;
    if (refChannels) {
        refChannels.forEach((chan) => { client.channels.fetch(chan); });
    }
    const tempChannels = fs.existsSync(`${__dirname}/../data/tempVoices.json`) ? await manip.readJsonFile(path.join(__dirname, '..', 'data/tempVoices.json'))
        .catch((err) => console.log(`[SAE-BOT][ERROR] ${err}`)) : null;
    if (tempChannels) {
        tempChannels.forEach((chan) => {
            client.channels.fetch(chan).then((channel) => {
                const members = channel.members.map((member) => member);
                if (!members || members.length === 0) { channel.delete('Remove auto generated channel'); }
            });
        });
    }
}

async function addMessagesToCache(client) {
    const files = fs.existsSync(`${__dirname}/../data/reactionroles`) ? requireAll({
        dirname: `${__dirname}/../data/reactionroles`,
        filter: /^(?!-)(.+)\.json$/,
    }) : [];
    const messages = Object.keys(files);
    const tickets = fs.existsSync(`${__dirname}/../data/reactionTickets.json`) ? await manip.readJsonFile(path.join(__dirname, '..', 'data/reactionTickets.json'))
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
    global.client.channels.fetch('893856260137566358').catch((err) => { throw err; });
    addMessagesToCache(client);
    addVoiceChannelsToCache(client);
    reload.reload();
};
