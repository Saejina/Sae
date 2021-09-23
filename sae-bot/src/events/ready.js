const reload = require('../functions/reloadCMD');

module.exports = (client) => {
    console.log(`\n[SAE-BOT] Logged in as ${client.user.tag}!`);
    reload.reload();
};
