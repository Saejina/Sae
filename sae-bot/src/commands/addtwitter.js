const createHelpEmbed = require('../utils/createHelpEmbed');
const getArgs = require('../utils/getArgs');
const messageEmbed = require('../utils/messageEmbed');
const manip = require('../utils/jsonManip');
const path = require('path');
const fs = require('fs');
const { O_CREAT, O_WRONLY } = require('constants');

async function addChannelToDb(channel, message, cmd) {
    const pathToChannels = path.join(path.dirname(__dirname), 'data/twitterChannels.json');
    if (!fs.existsSync(pathToChannels)) {
        return fs.open(pathToChannels, O_CREAT | O_WRONLY, undefined, (err, fd) => {
            if (err) { return console.log(`[SAE-BOT][ERROR] ${err}`); }
            fs.writeSync(fd, JSON.stringify([channel]));
            fs.close(fd);
            return message.reply(messageEmbed(cmd, 'Le salon a bien été ajouté.'));
        });
    }
    return manip.readJsonFile(pathToChannels).then((content) => {
        if (!content.includes(channel)) {
            content.push(channel);
            manip.writeJsonFile(pathToChannels, content);
            return message.reply(messageEmbed(cmd, 'Le salon a bien été ajouté.'));
        }
        return message.reply(messageEmbed(cmd, 'Le salon est déjà enregistré.'));
    }).catch((err) => console.log(`[SAE-BOT][ERROR] ${err}`));
}

module.exports = {
    description: 'Ajoute un channel à la liste des channels sur lesquels envoyer des tweets.',
    permissions: ['MANAGE_GUILD'],
    example: '`s!addtwitter` #monChannel OU IdDeMonChannel',
    cmd(client, message) {
        const args = getArgs(message.content);
        if (args.length === 0 || args[0] === 'help') { return createHelpEmbed(this, message); }
        const channel = message.mentions.channels && message.mentions.channels.first() ? message.mentions.channels.first() : message.channel.guild.channels.cache.get(args[0]);
        if (!channel) {
            return message.reply(messageEmbed(this, "Je n'ai pas trouvé ce channel"));
        }
        return addChannelToDb(channel.id, message, this);
    },
};