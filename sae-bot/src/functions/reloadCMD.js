const fs = require('fs');

class Command {
    constructor(base = '', permissions = [], description = '', action = () => {}, example) {
        this.base = base;
        this.permissions = permissions;
        this.description = description;
        this.action = action;
        this.example = example;
    }
}

module.exports = {
    reload() {
        global.CMDLISTINFO = [];
        global.CommandList = new Map();
        fs.readdirSync('src/commands').forEach((f) => {
            if (require.cache[require.resolve(`../commands/${f}`)] !== undefined) {
                delete require.cache[require.resolve(`../commands/${f}`)];
            }

            const cmdcache = require(`../commands/${f}`);
            const base = global.prefix + f.replace('.js', '');
            const cmddatacache = new Command(
                base, cmdcache.permissions, cmdcache.description, cmdcache.cmd, cmdcache.example,
            );
            console.log(`${base} -> INITIALISÉ`);
            global.CommandList.set(base, cmddatacache);
            if (cmdcache.help === true) {
                const CMDINFO = { name: base, description: cmdcache.description };
                global.CMDLISTINFO.push(CMDINFO);
            }
        });
    },
};
