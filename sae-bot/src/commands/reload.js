const Discord = require('discord.js');
const reload = require('../functions/reloadCMD');

module.exports = {
    permissions: ['ADMINISTRATOR'],
    description: 'Recharge les commandes',
    example: '`s!reload`',
    cmd(client, message) {
        const embed = new Discord.MessageEmbed()
            .setColor(global.mainColor)
            .setFooter(global.client.user.username, global.client.user.avatarURL())
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
