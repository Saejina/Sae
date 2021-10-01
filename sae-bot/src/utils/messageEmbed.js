const Discord = require('discord.js');

module.exports = function (command, content) {
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${command.base} 📋`)
        .setDescription(content)
        .setColor(global.mainColor)
        .setFooter(global.client.user.username, global.client.user.avatarURL())
        .setTimestamp();
    return { embeds: [embed] };
};
