const fs = require('fs');
const path = require('path');
const { O_CREAT, O_WRONLY } = require('constants');
const createHelpEmbed = require('../utils/createHelpEmbed');
const messageEmbed = require('../utils/messageEmbed');
const getEmoji = require('../utils/getEmoji');
const getArgs = require('../utils/getArgs');
const manip = require('../utils/jsonManip');

async function createReactionMessage(role, reaction, channel, message, cmd) {
    let content = '**Choisissez vos rôles**\n';
    const { emoji } = reaction;
    if (!emoji) { return message.channel.send(messageEmbed(this, 'Je n\'ai pas trouvé l\'emoji')); }
    content += `\n${getEmoji(emoji)}  -->  <@&${role.id}>`;
    const msg = await channel.send(content).catch((err) => console.log(`[SAE-BOT][ERROR] ${err}`));
    msg.react(emoji).catch((err) => console.log(`[SAE-BOT][ERROR] ${err}`));
    return fs.open(path.join(__dirname, `../data/reactionroles/${msg.id}.json`), O_CREAT | O_WRONLY, (err, fd) => {
        if (err) { console.log(`[SAE-BOT][ERROR] ${err}`); return message.channel.send(messageEmbed(cmd, "Je n'ai pas pu ajouter le message à la base de données.")); }
        return manip.writeJsonFile(fd,
            { guild: msg.channel.guild.id, channel: msg.channel.id, roles: [{ emoji: emoji.id ? emoji.id : emoji.name, role: role.id }] }).then(() => {
            fs.close(fd);
            return message.channel.send(messageEmbed(cmd, `J'ai bien ajouté le message à la base de données. Id : \`${msg.id}\``));
        }).catch((err) => { console.log(`[SAE-BOT][ERROR] ${err}`); return message.channel.send(messageEmbed(cmd, "Je n'ai pas pu ajouter le message à la base de données.")); });
    });
}

module.exports = {
    description: 'Crée un message pour l\'ajout de rôles par réaction',
    permissions: ['ADMINISTRATOR'],
    example: '`s!newreaction` #MonSalon OU IdDeMonSalon',
    async cmd(client, message) {
        const args = getArgs(message.content);
        if (!args || args.length === 0 || args[0] === 'help') {
            return createHelpEmbed(this, message);
        }
        const channel = message.mentions.channels.first() ? message.mentions.channels.first() : message.channel.guild.channels.cache.get(args[0]);
        if (!channel) {
            return message.reply(messageEmbed(this, "Je n'ai pas trouvé ce channel"));
        }
        const msg = await message.channel.send(messageEmbed(this, 'Tag le rôle que tu veux ajouter (tu pourras en ajouter d\'autres en utilisant `s!addreaction`)')).catch((err) => { console.log(`[SAE-BOT][ERROR] ${err}`); });
        const filter = (m) => m.author.id === message.author.id;
        const answers = await msg.channel.awaitMessages({
            filter, max: 1, time: 60000, errors: ['time'],
        }).catch((err) => console.log(`[SAE-BOT][ERROR] ${err}`));
        if (!answers.first().mentions.roles.first()) {
            return answers.first().reply(messageEmbed(this, "Je n'ai pas trouvé le rôle"));
        }
        const filter2 = (r) => !r.me;
        const msg2 = await message.channel.send(messageEmbed(this, "Réagis à ce message avec l'emoji que tu veux utiliser (utilise des emojis qui sont présents sur ce serveur)")).catch((err) => console.log(`[SAE-BOT][ERROR] ${err}`));
        const reactions = await msg2.awaitReactions({
            filter2, max: 1, time: 60000, errors: ['time'],
        }).catch((err) => console.log(`[SAE-BOT][ERROR] ${err}`));
        return createReactionMessage(answers.first().mentions.roles.first(), reactions.first(), channel, answers.first(), this);
    },
};
