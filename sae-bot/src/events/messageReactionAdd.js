const manip = require('../utils/jsonManip');
const createTicket = require('../functions/createTicket');
const fs = require('fs');

async function reactionTickets(reaction, author) {
    const tickets = await manip.readJsonFile(`${__dirname}/../data/reactionTickets.json`).catch((err) => console.log(`[SAE-BOT][ERROR] ${err}`));
    tickets.forEach((ticket) => {
        if (ticket.message === reaction.message.id) { createTicket(reaction, ticket, author); reaction.users.remove(author).catch((err) => console.log(`[SAE-BOT][ERROR] ${err}`)); }
    });
}

module.exports = (client, reaction, author) => {
    if (author.bot) return;

    if (reaction.emoji.name === '🎟️') { reactionTickets(reaction, author); }
    const files = fs.readdirSync(`${__dirname}/../data/reactionroles`);
    const data = files.map(file => {
        return { message: file.substring(0, file.length - 5), ...JSON.parse(fs.readFileSync(`${__dirname}/../data/reactionroles/${file}`)) };
    });
    const { emoji } = reaction;
    data.forEach((cell) => {
        if (cell.message === reaction.message.id) {
            cell.roles.forEach((rr) => {
                if (rr.emoji === emoji.name || rr.emoji === emoji.id) {
                    reaction.message.channel.guild.roles.fetch(rr.role).then((role) => {
                        reaction.message.channel.guild.members.fetch(author.id).then((member) => {
                            if (!member.roles.cache.has(role.id)) {
                                member.roles.add([role], "Rules Checked!").then(() => {
                                    if (role.id === "881327035409129523") {
                                        reaction.message.guild.roles.fetch("888155741796573204")
                                        .then((eggRole) => {
                                            member.roles.remove([eggRole], "Rules Checked!").catch((err) => { console.log(`[SAE-BOT][ERROR] ${err}`)})
                                        })
                                        .catch((err) => { console.log(`[SAE-BOT][ERROR] ${err}`)})
                                    }
                                })
                                .catch((err) => { console.log(`[SAE-BOT][ERROR] ${err}`); });
                            }
                        });
                    });
                }
            });
        }
    });
};
