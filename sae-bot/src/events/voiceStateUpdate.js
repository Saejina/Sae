const fs = require('fs');
const path = require('path');
const manip = require('../utils/jsonManip');

async function generateVoice(tempVoicesPath, tempVoices, event) {
    const refChannel = global.client.channels.cache.get(event.channelId);
    const author = await refChannel.guild.members.fetch(event.id);
    const id = tempVoices !== null ? tempVoices.length : 0;
    const channel = await refChannel.guild.channels.create(`${refChannel.name} ${id}`, {
        reason: `Auto vocal genration for ${author.tag}`,
        parent: refChannel.parent ? refChannel.parent : undefined,
        type: 'GUILD_VOICE',
    }).catch((err) => { console.log(`[SAE-BOT][ERROR] ${err}`); return author.voice.disconnect(); });
    if (tempVoices) {
        tempVoices.push(channel.id);
        manip.writeJsonFile(tempVoicesPath, tempVoices).catch((err) => console.log(`[SAE-BOT][ERROR] ${err}`));
    } else {
        manip.writeJsonFile(tempVoicesPath, [channel.id]).catch((err) => console.log(`[SAE-BOT][ERROR] ${err}`));
    }
    return author.voice.setChannel(channel, `Auto vocal generation for ${author.tag}`);
}

async function removeVoice(tempVoicesPath, tempVoices, id) {
    const index = tempVoices.findIndex((v) => v === id);
    tempVoices.splice(index, 1);
    const channel = await global.client.channels.fetch(id).catch((err) => console.log(`[SAE-BOT][ERROR] ${err}`));
    const members = channel.members.map((member) => member);
    if (!members || members.length === 0) {
        channel.delete('Removing auto generated channel').catch((err) => console.log(`[SAE-BOT][ERROR] ${err}`));
        manip.writeJsonFile(tempVoicesPath, tempVoices).catch((err) => console.log(`[SAE-BOT][ERROR] ${err}`));
    }
}

module.exports = async (client, oldState, newState) => {
    const tempVoicesPath = path.join(__dirname, '..', 'data/tempVoices.json');
    const genVoicePath = path.join(__dirname, '..', 'data/voiceChat.json');
    const genVoices = fs.existsSync(genVoicePath) ? await manip.readJsonFile(genVoicePath)
        .catch((err) => console.log(`[SAE-BOT][ERROR] ${err}`)) : null;
    const tempVoices = fs.existsSync(tempVoicesPath) ? await manip.readJsonFile(tempVoicesPath)
        .catch((err) => console.log(`[SAE-BOT][ERROR] ${err}`)) : null;
    if (newState.channelId && genVoices.includes(newState.channelId)) {
        generateVoice(tempVoicesPath, tempVoices, newState);
    } if (oldState.channelId && !newState.channelId && tempVoices && tempVoices.includes(oldState.channelId)) {
        removeVoice(tempVoicesPath, tempVoices, oldState.channelId);
    }
};
