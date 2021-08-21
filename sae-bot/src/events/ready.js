const reload = require('../functions/reloadCMD');

module.exports = (client) => {
    console.log(`\nLogged in as ${client.user.tag}!`);
    reload.reload();
};
