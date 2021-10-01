const fs = require('fs');
const path = require('path');
const { O_CREAT, O_WRONLY } = require('constants');
const getArgs = require('../utils/getArgs');
const createHelpEmbed = require('../utils/createHelpEmbed');
const messageEmbed = require('../utils/messageEmbed');
const getEmoji = require('../utils/getEmoji');
const manip = require('../utils/jsonManip');
const roleInMessage = require('../utils/roleInMessage');
const emojiInMessage = require('../utils/emojiInMessage');

function addReactToDatabase(message, role, emoji, channel, cmd) {
    const pathToJson = path.join(__dirname, `../data/reactionroles/${message.id}.json`);
    if (!fs.existsSync(pathToJson)) {
        return fs.open(pathToJson, O_CREAT | O_WRONLY, (err, fd) => {
            if (err) { console.log(`[SAE-BOT][ERROR] ${err}`); return channel.send(messageEmbed(cmd, "Je n'ai pas pu ajouter le message à la base de données.")); }
            return manip.writeJsonFile(fd,
                { guild: message.channel.guild.id, channel: message.channel.id, roles: [{ role: role.id, emoji: emoji.id ? emoji.id : emoji.name }] }).then(() => {
                message.react(emoji).catch((err) => { console.log(`[SAE-BOT][ERROR] ${err}`); });
                channel.send(messageEmbed(cmd, 'Le message a bien été ajouté à la base de données.'));
                return fs.close(fd);
            })
                .catch((err) => { console.log(`[SAE-BOT][ERROR] ${err}`); return channel.send(messageEmbed(cmd, "Je n'ai pas pu ajouter le message à la base de données.")); });
        });
    }
    return manip.readJsonFile(pathToJson)
        .then((content) => {
            content.roles.push({ emoji: emoji.id ? emoji.id : emoji.name, role: role.id });
            return manip.writeJsonFile(pathToJson, content)
                .then(() => {
                    if (message.author.id === global.client.user.id) {
                        message.edit(`${message.content}\n${getEmoji(emoji)}  -->  <@&${role.id}>`).catch((err) => { console.log(`[SAE-BOT][ERROR] ${err}`); });
                    }
                    channel.send(messageEmbed(cmd, 'Le rôle a bien été ajouté.'));
                    return message.react(emoji).catch((err) => console.log(`[SAE-BOT][ERROR] ${err}`));
                })
                .catch((err) => { console.log(`[SAE-BOT][ERROR] ${err}`); return channel.send(messageEmbed(cmd, "Je n'ai pas pu ajouter le message à la base de données.")); });
        })
        .catch((err) => {
            console.log(`[SAE-BOT][ERROR] ${err}`);
            return channel.send(messageEmbed(cmd, "Je n'ai pas réussi à ajouter le message à la base de données."));
        });
}

module.exports = {
    description: 'Ajoute un rôle à un message déjà envoyé',
    permissions: ['ADMINISTRATOR'],
    example: '`s!addreaction` #MonChannel OU IdDeMonChannel IdDeMonMessage @MonRôle utilise `s!messageid` si tu ne sais pas comment récupérer l\'id d\'un message ou d\'un channel',
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

        return roleInMessage(role.id, reactionMessage.id).then(() => message.reply(messageEmbed(this, 'Ce rôle est déjà associé à ce message.'))).catch(() => {
            message.reply(messageEmbed(this, 'Réagis à ce message avec l\'emoji qui doit correspondre.'))
                .then((msg) => {
                    const filter = (m) => !m.me;
                    msg.awaitReactions({
                        filter, max: 1, time: 60000, errors: ['time'],
                    }).then((collected) => {
                        if (!collected.first().emoji || !getEmoji(collected.first().emoji)) return message.reply(messageEmbed(this, "Je n'ai pas trouvé l'emoji."));

                        return emojiInMessage(collected.first().emoji, reactionMessage.id)
                            .then(() => message.reply(messageEmbed(this, 'Cet emoji est déjà associé à ce message.')))
                            .catch(() => addReactToDatabase(reactionMessage, message.mentions.roles.first(), collected.first().emoji, message.channel, this));
                    }).catch((err) => {
                        console.log(`[SAE-BOT][ERROR] ${err}`);
                        return message.channel.send(messageEmbed(this, 'Une erreur est survenue.'));
                    });
                }).catch(() => message.reply(messageEmbed(this, 'Une erreur est survenue.')));
        });
    },
};
