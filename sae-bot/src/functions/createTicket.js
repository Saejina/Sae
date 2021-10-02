const Discord = require('discord.js');
const fs = require('fs');
const { O_CREAT, O_WRONLY } = require('constants');
const manip = require('../utils/jsonManip');

function createTicketEmbed(author) {
    const embed = new Discord.MessageEmbed()
        .setColor(global.mainColor)
        .setAuthor('Ticket 🎟️')
        .setDescription(`Salut <@${author.id}> ! Voici un channel rien que pour toi, si tu veux discuter avec le staff !\nOn s'occupera de le fermer quand la discussion sera terminée !`)
        .setTimestamp()
        .setFooter(global.client.user.username, global.client.user.avatarURL())
        .setThumbnail(author.avatarURL());
    return { embeds: [embed], content: '\u200b' };
}

async function addTicketToDatabase(id, author) {
    const path = `${__dirname}/../data/tickets.json`;
    return new Promise((resolve, reject) => {
        if (fs.existsSync(path)) {
            manip.readJsonFile(path).then((content) => {
                content.push({ id, author: { name: author.username, id: author.id } });
                manip.writeJsonFile(path, content || []).then(() => resolve(content || [])).catch(reject);
            }).catch(reject);
        } else {
            const fd = fs.openSync(path, O_CREAT | O_WRONLY);
            manip.writeJsonFile(fd, [id]).then(() => {
                fs.closeSync(fd);
                resolve([{ id, author: { name: author.username, id: author.id } }]);
            }).catch(reject);
        }
    });
}

module.exports = async (reaction, ticket, author) => {
    const guild = await global.client.guilds.fetch(ticket.guild).catch((err) => { console.log(`[SAE-BOT][ERROR] ${err}`); });
    let parent = await guild.channels.cache.find((channel) => channel.name.toLowerCase().includes('tickets') && channel.type === 'GUILD_CATEGORY');
    if (!parent) {
        parent = await guild.channels.create('Tickets', { type: 'GUILD_CATEGORY' });
    }
    if (!guild || !guild.available) { return console.log('[SAE-BOT][ERROR] Guild is not available'); }
    const channel = await guild.channels.create(`ticket-${author.username}`, { type: 'GUILD_TEXT', topic: 'Discutez ici avec notre staff !', parent }).catch((err) => console.log(`[SAE-BOT][ERROR] ${err}`));
    if (!channel) return false;
    channel.permissionOverwrites.edit(author, { VIEW_CHANNEL: true });
    channel.permissionOverwrites.edit(guild.roles.everyone, { VIEW_CHANNEL: false });
    const tmp = await addTicketToDatabase(channel.id, author).catch((err) => console.log(`[SAE-BOT][ERROR] ${err}`));
    if (!tmp) return false;
    const msg = await channel.send(`<@${author.id}>`);
    return msg.edit(createTicketEmbed(author));
};
