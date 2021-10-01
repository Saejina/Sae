const createHelpEmbed = require('../utils/createHelpEmbed');
const getArgs = require('../utils/getArgs');
const messageEmbed = require('../utils/messageEmbed');

module.exports = {
    description: 'Supprime un maximum de 99 messages (il ne peuvent pas dater de plus de 14 jours)',
    permissions: ['MANAGE_MESSAGES'],
    example: '`s!clean` 10',
    cmd(client, message) {
        const args = getArgs(message.content);
        if (args.length === 0 || args[0] === 'help') { return createHelpEmbed(this, message); }
        var nb = Number(args[0]);
        message.channel.bulkDelete(nb).then((msgs) => {
            return message.channel.send(messageEmbed(this, `J'ai supprimé ${msgs.size} messages.`)).then((msg) => {
                return setTimeout(() => msg.delete(), 3000);
            })
        }).catch((err) => {
            console.log(`[SAE-BOT][ERROR] ${err}`);
            return message.channel.send(messageEmbed(this, "Une erreur est survenue."));
        })
    },
};
