const fs = require('fs');
const { O_CREAT, O_WRONLY } = require('constants');
const getArgs = require('../utils/getArgs');
const createHelpEmbed = require('../utils/createHelpEmbed');
const manip = require('../utils/jsonManip');
const messageEmbed = require('../utils/messageEmbed');

async function addToTickets(channel, message, cmdMessage, cmd) {
    const pathToTickets = `${__dirname}/../data/reactionTickets.json`;
    if (fs.existsSync(pathToTickets)) {
        let content = await manip.readJsonFile(pathToTickets).catch((err) => {
            console.log(`[SAE-BOT][ERROR] ${err}`);
            return cmdMessage.reply(messageEmbed(cmd, 'Une erreur est survenue.'));
        });
        if (!content) { content = []; }
        content.push({
            guild: channel.guild.id,
            channel: channel.id,
            message: message.id,
        });
        console.log(content);
        manip.writeJsonFile(pathToTickets, content).catch((err) => { console.log(`[SAE-BOT][ERROR] ${err}`); });
        message.react('🎟️').catch((err) => { console.log(`[SAE-BOT][ERROR] ${err}`); });
        return cmdMessage.reply(messageEmbed(cmd, 'Ticket créé.'));
    }
    const fd = fs.openSync(pathToTickets, O_CREAT | O_WRONLY);
    fs.writeFileSync(fd, JSON.stringify([{
        guild: channel.guild.id,
        channel: channel.id,
        message: message.id,
    }]));
    fs.closeSync(fd);
    message.react('🎟️');
    return cmdMessage.reply(messageEmbed(cmd, 'Ticket créé.'));
}

module.exports = {
    description: 'Ajoute un ticket à la base de données.',
    permissions: ['MANAGE_GUILD'],
    example: '`s!newticket` #MonChannel OU IdDeMonChannel IdDeMonMessage',
    async cmd(client, message) {
        const args = getArgs(message.content);
        if (args.length === 0 || args[0] === 'help') { return createHelpEmbed(this, message); }

        let channel = message.mentions.channels.first();
        if (!channel) {
            channel = await client.channels.fetch(args[0]).catch(() => { message.reply(messageEmbed(this, "Je n'ai pas trouvé le salon.")); });
            if (!channel) { return message.reply(messageEmbed(this, "Je n'ai pas trouvé le salon.")); }
        }

        const ticketMessage = await channel.messages.fetch(args[1]).catch(() => message.reply(messageEmbed(this, "Je n'ai pas trouvé le message.")));
        if (!ticketMessage) { return message.reply(messageEmbed(this, "Je n'ai pas trouvé le message.")); }

        return addToTickets(channel, ticketMessage, message, this);
    },
};
