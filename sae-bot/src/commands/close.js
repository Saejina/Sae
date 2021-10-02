const Discord = require('discord.js');
const fetchAll = require('discord-fetch-all');
const path = require('path');
const manip = require('../utils/jsonManip');
const messageEmbed = require('../utils/messageEmbed');
const transcript = require('../functions/transcript');

async function closeTicket(message) {
    return new Promise((resolve, reject) => {
        fetchAll.messages(message.channel, {
            reverseArray: true,
            userOnly: true,
            botOnly: false,
            pinnedOnly: false,
        }).then((messages) => {
            const cleanedMessages = messages.filter((message) => !message.deleted);
            transcript(cleanedMessages, 'lastTicket')
                .then(resolve)
                .catch(reject);
        }).catch(reject);
    });
}

async function removeFromTickets(message) {
    const content = await manip.readJsonFile(path.join(__dirname, '..', 'data', 'tickets.json'));
    const id = content.findIndex((ticket) => ticket.id === message.channel.id);
    content.splice(id, 1);
    manip.writeJsonFile(path.join(__dirname, '..', 'data', 'tickets.json'), content)
        .catch((err) => { console.log(`[SAE-BOT][ERROR] ${err}`); });
}

module.exports = {
    description: 'Ferme un ticket.',
    permissions: ['MANAGE_GUILD'],
    example: 's!close',
    async cmd(client, message) {
        const path = `${__dirname}/../data/tickets.json`;
        const channels = await manip.readJsonFile(path);
        if (!channels) return message.reply(messageEmbed(this, 'Nous ne sommes pas dans un ticket.'));
        const channel = channels.find((chan) => chan.id === message.channel.id);
        const saveChannel = await global.client.channels.cache.get('893856260137566358');
        if (channel) {
            return closeTicket(message)
                .then((ticket) => {
                    message.channel.send(messageEmbed(this, 'Voulez-vous sauvegarder ce ticket ? (Répondez avec :white_check_mark: ou :x:')).then((msg) => {
                        const filter = (m) => m.author.id === message.author.id;
                        msg.channel.awaitMessages({
                            filter, max: 1, time: 60000, errors: ['time'],
                        }).then((collected) => {
                            if (collected.first().content === '✅') {
                                const attachment = new Discord.MessageAttachment(ticket, `ticket-${channel.author.name}-${channel.id}.html`);
                                saveChannel.send({ files: [attachment], content: `Ticket de <@${channel.author.id}>` });
                            }
                            message.reply(messageEmbed(this, 'Je ferme le ticket.')).catch((err) => console.log(`[SAE-BOT][ERROR] ${err}`));
                            removeFromTickets(message);
                            return setTimeout(() => message.channel.delete(), 2000);
                        }).catch((err) => { console.log(`[SAE-BOT][ERROR] ${err}`); return channel.send(messageEmbed(this, 'Je ne supprime pas le ticket.')); });
                    });
                })
                .catch((err) => {
                    console.log(`[SAE-BOT][ERROR] ${err}`);
                    return message.reply(messageEmbed(this, 'Une erreur est survenue.'));
                });
        }
        return message.reply(messageEmbed(this, 'Nous ne sommes pas dans un ticket.'));
    },
};
