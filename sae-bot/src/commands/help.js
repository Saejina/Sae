const Discord = require('discord.js');
const paginationEmbed = require('../utils/paginationEmbed');

function splitArrayIntoChunksOfLen(arr, len) {
    const chunks = [];
    let i = 0;
    const n = arr.length;
    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }
    return chunks;
}

function getHelpContent(member) {
    const content = [];
    global.CommandList.forEach((element) => {
        if (element.permissions.length <= 0) {
            content.push({ name: element.base, desc: element.description, example: element.example });
        }
        element.permissions.forEach((permission) => {
            if (member.permissions.has(permission)) {
                content.push({ name: element.base, desc: element.description, example: element.example });
            }
        });
    });
    return (content);
}

function createPagedHelpEmbed(message, cont) {
    const embeds = [];
    const content = splitArrayIntoChunksOfLen(cont, 5);
    content.forEach((ele) => {
        const embed = new Discord.MessageEmbed()
            .setColor(global.mainColor)
            .setTitle('Section d\'aide');
        ele.forEach((ele2) => {
            console.log(ele2);
            embed.addFields({ name: ele2.name, value: `${ele2.desc}\nExemple : ${ele2.example}` });
        });
        embeds.push(embed);
    });
    paginationEmbed(message, embeds);
}

module.exports = {
    name: 'help',
    description: 'Montre toutes les commandes disponibles',
    permissions: [],
    example: 'q!help',
    cmd(client, message) {
        const content = getHelpContent(message.member);
        createPagedHelpEmbed(message, content);
    },
};
