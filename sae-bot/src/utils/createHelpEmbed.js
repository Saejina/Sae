const Discord = require('discord.js');

module.exports = (command, message) => {
    const embed = new Discord.MessageEmbed()
        .setAuthor("Section d'aide  💡")
        .setDescription(`Voici quelques infos sur la commande \`${command.base}\``)
        .addField('Description', command.description)
        .addField('Exemple', command.example)
        .setThumbnail(message.author.avatarURL())
        .setTimestamp(new Date())
        .setColor(global.mainColor)
        .setFooter(global.client.user.username, global.client.user.avatarURL());
    message.channel.send({ embeds: [embed] });
};
