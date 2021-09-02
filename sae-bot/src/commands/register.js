const { hash } = require('bcryptjs');
const Discord = require('discord.js');

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
                return channel.send('Vous avez bien été ajouté(e) à la base de données.');
            });
        });
    });
}

module.exports = {
    help: false,
    permissions: ['MANAGE_GUILD'],
    description: 'Crée votre compte sur la plateforme en ligne.',
    example: 's!register',
    async cmd(client, message) {
        message.author.createDM().then((channel) => {
            channel.send("Quel nom d'utilisateur voulez vous utiliser pour vous connecter ?").then((msg) => {
                const filter = (mess) => !mess.author.bot;
                channel.awaitMessages({
                    filter, max: 1, time: 60000, errors: ['time'],
                }).then((collected) => {
                    const username = collected.first().content;
                    channel.send('Quel mot de passe voulez vous utiliser ? (Vous pouvez supprimer le message une fois le mot de passe recupéré).').catch((err) => { console.log(err); });
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
                                    channel.send("J'annule la procédure.");
                                    return setTimeout(() => mess.delete(), 10000);
                                });
                            })
                            .catch((err) => { console.log(err); channel.send("Votre demande d'enregistrement est annulée."); });
                    });
                }).catch((err) => {
                    console.log(err);
                    return channel.send("Votre demande d'enregistrement est annulée.");
                });
            });
        });
    },
};
