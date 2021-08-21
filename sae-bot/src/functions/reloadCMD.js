const fs = require('fs');

class Command {
    constructor(base = '') {
        this.c = base;
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
            const cmddatacache = new Command({
                base, permissions: cmdcache.permissions, description: cmdcache.description, help: cmdcache.help, action: cmdcache.cmd,
            });
            console.log(`${base} -> INITIALISÉ`);
            global.CommandList.set(base, cmddatacache);
            if (cmdcache.help === true) {
                const CMDINFO = { name: base, description: cmdcache.description };
                global.CMDLISTINFO.push(CMDINFO);
            }
        });
    },
};
