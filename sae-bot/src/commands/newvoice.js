const fs = require('fs');
const path = require('path');
const { O_CREAT, O_WRONLY } = require('constants');
const messageEmbed = require('../utils/messageEmbed');
const createHelpEmbed = require('../utils/createHelpEmbed');
const getArgs = require('../utils/getArgs');
const manip = require('../utils/jsonManip');

module.exports = {
    description: 'Enregistre un salon vocal dans la base de données.',
    permissions: ['MANAGE_GUILD'],
    example: 's!newvoice #MonChannel OU #IdDeMonChannel',
    async cmd(client, message) {
        const args = getArgs(message.content);
        if (!args || args.length === 0 || args[0] === 'help') {
            return createHelpEmbed(this, message);
        }
        const channel = message.mentions.channels.first() ? message.mentions.channels.first() : message.channel.guild.channels.cache.get(args[0]);
        if (!channel) {
            return message.reply(messageEmbed(this, "Je n'ai pas trouvé ce channel"));
        }
        if (channel.type !== 'GUILD_VOICE') return message.reply(messageEmbed(this, "Le salon n'est pas un salon vocal."));
        const pathToVoice = path.join(__dirname, '..', 'data/voiceChat.json');
        if (!fs.existsSync(pathToVoice)) {
            return fs.open(pathToVoice, O_CREAT | O_WRONLY, undefined, (err, fd) => {
                if (err) { return console.log(`[SAE-BOT][ERROR] ${err}`); }
                fs.writeSync(fd, JSON.stringify([channel.id]));
                fs.close(fd);
                return message.reply(messageEmbed(this, 'Le salon vocal a bien été ajouté.'));
            });
        }
        return manip.readJsonFile(pathToVoice).then((content) => {
            if (!content.includes(channel.id)) {
                content.push(channel.id);
                manip.writeJsonFile(pathToVoice, content);
                return message.reply(messageEmbed(this, 'Le salon vocal a bien été ajouté.'));
            }
            return message.reply(messageEmbed(this, 'Le salon vocal est déjà enregistré.'));
        }).catch((err) => console.log(`[SAE-BOT][ERROR] ${err}`));
    },
};
