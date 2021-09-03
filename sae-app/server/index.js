const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const {Client, Intents} = require('discord.js');
const routes = require('./config/routes');

require('dotenv').config({ path: path.resolve(__dirname + '/.env') });
require('./config/db');

global.client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS]});
global.client.login(process.env.DISCORD_TOKEN);
global.client.on('ready', () => {
    global.client.guilds.fetch().then((guilds) => {
        for (let i = 0; i < guilds.length; i++) {
            guilds.each(guild => {
                guild.members.fetch();
            });
        };
    }).catch((err) => {
        console.log(err);
    });
});

const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
}));

app.use(bodyParser.urlencoded({extended: true}));

routes.create(app);

app.listen(process.env.PORT, () => {
    console.log(`[SAE-APP] App listening on port ${process.env.PORT}`)
});