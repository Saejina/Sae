const path = require('path');
require('dotenv').config({ path: path.resolve(`${__dirname}../../.env`) });
require('./configs/database');
const Discord = require('discord.js');
const fs = require('fs');

if (!fs.existsSync(`${__dirname}/reactionroles`)) {
    fs.mkdirSync(`${__dirname}/reactionroles`);
}

const client = new Discord.Client({ intents: ['GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'GUILDS'] });
require('./configs/router');
const requireAll = require('require-all');

const files = requireAll({
    dirname: `${__dirname}/events`,
    filter: /^(?!-)(.+)\.js$/,
});

global.prefix = 's!';
global.mainColor = '#f180f8';
global.secondColor = '#1f51ff';
global.client = client;

for (const name in files) {
    const event = files[name];
    client.on(name, event.bind(null, client));
    console.log(`[SAE-BOT] Event loaded: ${name}`);
}

client.login(process.env.DISCORD_TOKEN);
