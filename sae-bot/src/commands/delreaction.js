const fs = require('fs');
const path = require('path');
const getArgs = require('../utils/getArgs');
const createHelpEmbed = require('../utils/createHelpEmbed');
const messageEmbed = require('../utils/messageEmbed');
const manip = require('../utils/jsonManip');
const roleInMessage = require('../utils/roleInMessage');

function editMessageContent(message, roleId) {
    let newContent = message.content.split('\n');
    const id = newContent.findIndex((value) => (value.includes(roleId)));
    newContent.splice(id, 1);
    newContent = newContent.join('\n');
    return message.edit(newContent).catch((err) => { console.log(`[SAE-BOT][ERROR] ${err}`); });
}

function removeReaction(message, removed, channel, cmd) {
    return message.reactions.cache.map((reaction) => {
        if (reaction.emoji.name === removed[0].emoji || (reaction.emoji.id && reaction.emoji.id === removed[0].emoji)) {
            return reaction.remove()
                .then(() => { channel.send(messageEmbed(cmd, 'Rôle supprimé.')); })
                .catch((err) => console.log(`[SAE-BOT][ERROR] ${err}`));
        }
        return reaction;
    });
}

function removeReactFromDatabase(message, role, channel, cmd) {
    const pathToJson = path.join(__dirname, `../data/reactionroles/${message.id}.json`);
    if (!fs.existsSync(pathToJson)) {
        return channel.send(messageEmbed(cmd, 'Le message ne se trouve pas dans la base de données.'));
    }
    return manip.readJsonFile(pathToJson)
        .then((content) => {
            const ind = content.roles.findIndex((value) => value.role === role.id);
            const removed = content.roles.splice(ind, 1);
            return manip.writeJsonFile(pathToJson, content)
                .then(() => {
                    if (message.author.id === global.client.user.id) {
                        editMessageContent(message);
                    }
                    removeReaction(message, removed, channel, cmd);
                })
                .catch((err) => { console.log(`[SAE-BOT][ERROR] ${err}`); return channel.send(messageEmbed(cmd, "Je n'ai pas pu retirer le message de la base de données.")); });
        })
        .catch((err) => {
            console.log(`[SAE-BOT][ERROR] ${err}`);
            return channel.send(messageEmbed(cmd, "Je n'ai pas réussi à retirer le message de la base de données."));
        });
}

module.exports = {
    description: 'Ajoute un rôle à un message déjà envoyé',
    permissions: ['ADMINISTRATOR'],
    example: '`s!delreaction` #MonChannel OU IdDeMonChannel IdDeMonMessage @MonRôle utilise `s!messageid` si tu ne sais pas comment récupérer l\'id d\'un message ou d\'un channel',
    async cmd(client, message) {
        const args = getArgs(message.content);
        if (!args || args.length === 0 || args[0] === 'help') { return createHelpEmbed(this, message); }

        let channel = message.mentions.channels.first();
        if (!channel) {
            channel = await client.channels.fetch(args[0]).catch(() => { message.reply(messageEmbed(this, "Je n'ai pas trouvé le salon.")); });
            if (!channel) { return message.reply(messageEmbed(this, "Je n'ai pas trouvé le salon.")); }
        }

        const reactionMessage = await channel.messages.fetch(args[1]).catch(() => message.reply(messageEmbed(this, "Je n'ai pas trouvé le message.")));
        if (!reactionMessage) { return message.reply(messageEmbed(this, "Je n'ai pas trouvé le message.")); }

        const role = message.mentions.roles.first();
        if (!role) { return message.reply(messageEmbed(this, "Je n'ai pas trouvé le rôle.")); }

        return roleInMessage(role.id, reactionMessage.id)
            .then(() => removeReactFromDatabase(reactionMessage, message.mentions.roles.first(), message.channel, this))
            .catch(() => message.reply(messageEmbed(this, "Ce rôle n'est pas dans la base de données.")));
    },
};
