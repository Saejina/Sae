const Discord = require('discord.js');
const transcript = require('../functions/transcript');
const getArgs = require('../utils/getArgs');
const createHelpEmbed = require('../utils/createHelpEmbed');
const messageEmbed = require('../utils/messageEmbed');

module.exports = {
    description: 'Sauvegarde le salon dans lequel vous vous trouvez.',
    permissions: ['MANAGE_GUILD'],
    example: 's!save nb (facultatif)',
    async cmd(client, message) {
        const args = getArgs(message.content);
        if (args.lenth === 1 && args[0] === 'help') { return createHelpEmbed(this, message); }
        const nb = args.length > 0 ? args[0] : 0;
        const allMessages = await message.channel.messages.fetch();
        const messages = allMessages.map((mess, index) => {
            if (index !== 0) {
                return (mess);
            }
            return null;
        });
        const filteredMessages = messages.filter((message) => message && !message.author.bot);
        const messageArray = filteredMessages.map((message) => message);
        const reversedArray = messageArray.reverse();
        const saveChannel = await global.client.channels.cache.get('893857780363055114');
        transcript(nb <= 0 ? reversedArray : reversedArray.splice(reversedArray.length - nb - 1, reversedArray.length - 1), 'lastSave')
            .then((ticket) => {
                const attachment = new Discord.MessageAttachment(ticket, `save-${message.channel.name}.html`);
                saveChannel.send({ files: [attachment], content: `Sauvegarde de <#${message.channel.id}>` });
            })
            .catch((err) => { console.log(`[SAE-BOT][ERROR] ${err}`); return message.reply(messageEmbed(this, 'Une erreur est survenue.')); });
        return message.delete();
    },
};
