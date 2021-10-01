const Discord = require('discord.js');
const requireAll = require('require-all');
const getEmoji = require('../utils/getEmoji');
const paginationEmbed = require('../utils/paginationEmbed');
const messageEmbed = require('../utils/messageEmbed');
const getArgs = require('../utils/getArgs');

function createReactionEmbed(file, key) {
    const channel = global.client.channels.cache.get(file.channel);
    const message = channel.messages.cache.get(key);
    if (!message) return null;
    const embed = new Discord.MessageEmbed()
        .setColor(global.mainColor)
        .setAuthor('Reaction roles 📋')
        .setDescription(message.content);
    file.roles.forEach((role, index) => {
        const roleName = message.channel.guild.roles.cache.get(role.role).name;
        const isnum = /^\d+$/.test(role.emoji);
        const emoji = isnum ? getEmoji({ id: role.emoji }) : role.emoji;
        embed.addField(`${index + 1}- ${emoji}`, roleName || '\u200b', true);
    });
    return embed;
}

module.exports = {
    description: 'Affiche tous les reactionroles existants',
    permissions: ['ADMINISTRATOR'],
    example: '`s!reactionroles',
    cmd(client, message) {
        const args = getArgs(message.content);
        const guildId = args.length > 0 ? args[0] : message.channel.guild.id;
        if (!global.client.guilds.cache.has(guildId)) return message.reply(messageEmbed(this, "Je n'ai pas trouvé le serveur."));
        const embeds = [];
        const files = requireAll({
            dirname: `${__dirname}/../reactionroles`,
            filter: /^(?!-)(.+)\.json$/,
        });
        const keys = Object.keys(files);
        keys.forEach((key) => {
            embeds.push(createReactionEmbed(files[key], key));
        });
        const filtered = embeds.filter((embed) => embed);
        if (filtered.length === 0) { return message.reply(messageEmbed(this, "Je n'ai pas de reactionroles à montrer.")); }
        return paginationEmbed(message, filtered);
    },
};
