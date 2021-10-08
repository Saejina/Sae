const fs = require('fs');

module.exports = (client, reaction, author) => {
    if (author.bot) { return; }
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
                            if (member.roles.cache.has(role.id)) {
                                member.roles.remove([role]).catch((err) => { console.log(`[SAE-BOT][ERROR] ${err}`); });
                                if (role.id === "881327035409129523") {
                                    member.roles.add(["888155741796573204"]).catch((err) => { console.log(`[SAE-BOT][ERROR] ${err}`)});
                                }
                            }
                        });
                    });
                }
            });
        }
    });
};
