const messageEmbed = require('../utils/messageEmbed');

module.exports = {
    description: "Un tutoriel pour récupérer l'id d'un message",
    permissions: [],
    example: 's!messageid',
    cmd(client, message) {
        return message.reply(messageEmbed(this, 'https://support.discord.com/hc/fr/articles/206346498-O%C3%B9-trouver-l-ID-de-mon-compte-utilisateur-serveur-message-'));
    },
};
