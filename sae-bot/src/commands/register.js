// const { hash } = require('bcryptjs');
// const Discord = require('discord.js');
const createHelpEmbed = require('../utils/createHelpEmbed');
const messageEmbed = require('../utils/messageEmbed');
/*
async function setPerms(id, channel) {
    return global.database.query('SELECT * from platformUsers where discord_id = ?', id, (err, results) => {
        if (err) {
            return console.log(err);
        }
        global.database.query('INSERT INTO platformPerms set ?', { id: results[0].id }, (err) => {
            if (err) { console.log(err); }
        });
        return channel.send('Vous avez bien été ajouté(e) à la base de données.');
    });
}

async function addToDatabase(username, password, id, channel) {
    const encryptedPassword = await hash(password, Number(process.env.SALTROUNDS));
    const user = {
        username,
        password: encryptedPassword,
        discord_id: id,
    };
    global.database.query('select * from platformUsers where username = ?', user.username, (err, users) => {
        if (err) {
            return channel.send("Je n'ai pas réussi à t'ajouter à la base de données.");
        } if (users.length !== 0) {
            return channel.send("Ce nom d'utilisateur est déjà utilisé.");
        }
        return global.database.query('select * from platformUsers where discord_id = ?', user.discord_id, (err, ids) => {
            if (err) {
                return channel.send("Je n'ai pas réussi à t'ajouter à la base de données.");
            } if (ids.length !== 0) {
                return channel.send("Tu as déjà un compte sur notre plateforme. Utilise s!editacc pour changer tes informations. Tout est basé sur l'identifiant discord, si tu oublies ton mot de passe tu peux le réinitialiser via cette commande.");
            }
            return global.database.query('insert into platformUsers set ?', user, (err) => {
                if (err) {
                    return channel.send("Je n'ai pas réussi à t'ajouter à la base de données.");
                }
                return setPerms(id, channel);
            });
        });
    });
}
*/
module.exports = {
    permissions: ['MANAGE_GUILD'],
    description: 'Crée votre compte sur la plateforme en ligne',
    example: '`s!register` (la suite se passe en dm)',
    async cmd(client, message) {
        const args = message.content.split(' ').slice(1);
        if (args[0] === 'help') {
            return createHelpEmbed(this, message);
        }
        return message.reply(messageEmbed(this, 'Cette commande est en maintenance.'));
        /*
        return message.author.createDM().then((channel) => {
            channel.send(messageEmbed(this, "Quel nom d'utilisateur voulez vous utiliser pour vous connecter ?")).then((msg) => {
                const filter = (mess) => !mess.author.bot;
                channel.awaitMessages({
                    filter, max: 1, time: 60000, errors: ['time'],
                }).then((collected) => {
                    const username = collected.first().content;
                    channel.send(messageEmbed(this, 'Quel mot de passe voulez vous utiliser ? (Vous pouvez supprimer le message une fois le mot de passe recupéré).')).catch((err) => { console.log(err); });
                    channel.awaitMessages({
                        filter, max: 1, time: 60000, errors: ['time'],
                    }).then((collected) => {
                        const password = collected.first().content;
                        const embed = new Discord.MessageEmbed({
                            title: 'Vérification des informations 📝',
                            description: '\u200b',
                            color: global.mainColor,
                            footer: {
                                icon_url: msg.author.avatarURL(),
                                text: 'Ce message se supprimera automatiquement.',
                            },
                            fields: [
                                {
                                    value: '\u200b',
                                    name: 'Ce sont bien les informations que vous vouliez entrer ? Répondez avec :white_check_mark: ou :x:',
                                },
                                {
                                    name: "Nom d'utilisateur",
                                    value: username,
                                    inline: true,
                                },
                                {
                                    name: 'Mot de passe',
                                    value: password,
                                    inline: true,
                                },
                            ],
                        });
                        channel.send({ embeds: [embed] })
                            .then((mess) => {
                                channel.awaitMessages({
                                    filter, max: 1, time: 60000, errors: ['time'],
                                }).then((collected) => {
                                    if (collected.first().content === '✅') {
                                        addToDatabase(username, password, message.author.id, channel);
                                        return setTimeout(() => mess.delete(), 10000);
                                    }
                                    channel.send(messageEmbed(this, "J'annule la procédure."));
                                    return setTimeout(() => mess.delete(), 10000);
                                });
                            })
                            .catch((err) => { console.log(err); channel.send(messageEmbed(this, "Votre demande d'enregistrement est annulée.")); });
                    });
                }).catch((err) => {
                    console.log(err);
                    return channel.send(messageEmbed(this, "Votre demande d'enregistrement est annulée."));
                });
            });
        }); */
    },
};
