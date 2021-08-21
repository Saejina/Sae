const Discord = require('discord.js');
const reload = require('../functions/reloadCMD');

module.exports = {
    help: false,
    permissions: ['ADMINISTRATOR'],
    description: 'Reload les commandes.',
    example: 's!reload',
    cmd(client, message) {
        const embed = new Discord.MessageEmbed()
            .setColor(global.mainColor)
            .setAuthor('Mise à jour des commandes');
        message.channel.send({ embeds: [embed] }).then((msg) => {
            reload.reload();
            const editedEmbed = new Discord.MessageEmbed()
                .setColor(global.mainColor)
                .setAuthor(`Mise à jour de ${global.CommandList.size} commandes effectuée ✅`);
            msg.edit({ embeds: [editedEmbed] });
        });
    },
};
