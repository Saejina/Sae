const Discord = require('discord.js');

module.exports = (client, message) => {
    if (message.author.id === client.user.id) {
        return;
    }

    if (message.content.startsWith(global.prefix)) {
        const content = message.content.split(' ')[0].slice(global.prefix.length).toLowerCase();
        if (global.CommandList.has(global.prefix + content)) {
            if (!message.member.permissions.has(global.CommandList.get(global.prefix + content).c.permissions)) {
                message.delete({ timeout: 3000 });
                message.reply("Tu n'as pas les permissions nécessaires pour utiliser cette commande.").then((msg) => msg.delete({ timeout: 2600 }));
            } else {
                global.CommandList.get(global.prefix + content).c.action(client, message);
            }
        } else {
            const CMDLIST = [];
            console.log(global.CMDLISTINFO);
            global.CMDLISTINFO.forEach((cmdinfo) => {
                CMDLIST.push(cmdinfo.name);
            });
            const embed = new Discord.MessageEmbed()
                .setDescription(`La commande \`${content}\` est inexistante.`)
                .setColor('#f180f8');
            message.channel.send({ embeds: [embed] });
        }
    }
};
