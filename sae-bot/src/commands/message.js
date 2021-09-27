const getArgs = require('../utils/getArgs');
const { createHelpEmbed } = require('../utils/helpEmbed');
const messageEmbed = require('../utils/messageEmbed');

function createMessage(message) {
    const content = message.content.split(' ').slice(1).join(' ');
    const attachments = [];
    const stickers = [];
    const final = {};
    if (content && content.length > 0) {
        final.content = content;
    }
    message.stickers.each((sticker) => stickers.push(sticker));
    message.attachments.each((att) => attachments.push(att));
    final.files = attachments;
    final.embeds = message.embeds;
    final.components = message.components;
    final.stickers = stickers;
    return final;
}

module.exports = {
    description: 'Envoie le message de votre choix dans le channel de votre choix',
    permissions: ['ADMINISTRATOR'],
    example: '`s!message` Mon message :3',
    cmd(client, message) {
        const args = getArgs(message.content);
        if ((args.length === 0 && !message.attachments.first() && !message.stickers.first() && message.embeds.length === 0) || args[0] === 'help') {
            return createHelpEmbed(this, message);
        }
        message.reply(messageEmbed(this, "Tag ou donne l'ID du channel dans lequel tu veux poster le message"));
        const filter = (m) => m.author.id === message.author.id;
        return message.channel.awaitMessages({
            filter, max: 1, time: 120000, erros: ['time'],
        }).then((collected) => {
            let channel = collected.first().mentions.channels.first() ? collected.first().mentions.channels.first() : collected.first().content;
            if (typeof channel === 'string') {
                channel = message.channel.guild.channels.cache.get(channel);
            }
            if (!channel) { return (message.channel.send(messageEmbed(this, "Je n'ai pas trouvé ce salon."))); }
            return channel.send(createMessage(message));
        });
    },
};
