const getArgs = require('../utils/getArgs');
const createHelpEmbed = require('../utils/createHelpEmbed');
const messageEmbed = require('../utils/messageEmbed');

function createMessage(message) {
    const content = message.content.split(' ').slice(1).join(' ');
    const final = {
        content: '',
        files: [],
        embeds: message.embeds,
        components: message.components,
        stickers: [],
    };
    if (content && content.length > 0) {
        final.content = content;
    }
    final.content += final.content.length > 0 ? '\n\n||@everyone||' : '||@everyone||';
    message.stickers.each((sticker) => final.stickers.push(sticker));
    message.attachments.each((att) => final.files.push(att));
    return final;
}

module.exports = {
    description: 'Envoie le message de votre choix dans le channel de votre choix en mentionnant `@everyone`',
    permissions: ['ADMINISTRATOR'],
    example: '`s!annonce` Mon message :3',
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
