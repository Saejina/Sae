const requireAll = require('require-all');
const manip = require('../utils/jsonManip');
const createTicket = require('../functions/createTicket');

async function reactionTickets(reaction, author) {
    const tickets = await manip.readJsonFile(`${__dirname}/../data/reactionTickets.json`).catch((err) => console.log(`[SAE-BOT][ERROR] ${err}`));
    tickets.forEach((ticket) => {
        if (ticket.message === reaction.message.id) { createTicket(reaction, ticket, author); }
    });
}

module.exports = (client, reaction, author) => {
    if (author.bot) return;

    if (reaction.emoji.name === '🎟️') { reactionTickets(reaction, author); }
    const files = requireAll({
        dirname: `${__dirname}/../data/reactionroles`,
        filter: /^(?!-)(.+)\.json$/,
    });
    const keys = Object.keys(files);
    const { emoji } = reaction;
    keys.forEach((message) => {
        if (message === reaction.message.id) {
            files[message].roles.forEach((rr) => {
                if (rr.emoji === emoji.name || rr.emoji === emoji.id) {
                    reaction.message.channel.guild.roles.fetch(rr.role).then((role) => {
                        reaction.message.channel.guild.members.fetch(author.id).then((member) => {
                            member.roles.add([role]).catch((err) => { console.log(`[SAE-BOT][ERROR] ${err}`); });
                        });
                    });
                }
            });
        }
    });
};
