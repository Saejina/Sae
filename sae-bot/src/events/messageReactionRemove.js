const requireAll = require('require-all');

module.exports = (client, reaction, author) => {
    if (author.bot) { return; }
    const files = requireAll({
        dirname: `${__dirname}/../reactionroles`,
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
                            if (member.roles.cache.has(role.id)) {
                                member.roles.remove([role]).catch((err) => { console.log(`[SAE-BOT][ERROR] ${err}`); });
                            }
                        });
                    });
                }
            });
        }
    });
};
