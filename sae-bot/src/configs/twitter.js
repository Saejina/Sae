const Twitter = require('twitter');
const Discord = require('discord.js');
const manip = require('../utils/jsonManip');
const path = require('path');
const fs = require('fs');

async function sendTweet(tweet, channelId) {
    const channel = await global.client.channels.fetch(channelId);
    channel.send(`Nous venons de poster un tweet, allez jeter un oeil !\nhttps://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`);
}

async function initiateSending(tweet) {
    const pathToChannels = path.join(path.dirname(__dirname), 'data', 'twitterChannels.json');
    if (!fs.existsSync(pathToChannels)) {
        return console.log("[SAE-BOT][ERROR] Could not find channels to send tweet to...");
    }
    return manip.readJsonFile(pathToChannels).then((content) => {
        if (!content) return console.log("[SAE-BOT][ERROR] Could not find channels to send tweet to.");
        content.forEach((channel) => {
            sendTweet(tweet, channel);
        });
    }).catch((err) => console.log(`[SAE-BOT][ERROR] ${err}`));
}

var twitterClient = new Twitter({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_KEY_SECRET,
    access_token_key: process.env.TWITTER_API_TOKEN,
    access_token_secret: process.env.TWITTER_API_TOKEN_SECRET,
});

twitterClient.stream('statuses/filter', { follow: "1431307426515591200" }, (stream) => {
    console.log(`[SAE-BOT][TWITTER] Listening for tweets from @SaejinaeSport`);
    stream.on('data', (data) => {
        initiateSending(data);
    });

    stream.on('error', (err) => {
        console.log(err);
    })
});