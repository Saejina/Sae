const parse = require('parse-duration');
const Discord = require('discord.js');

const indexMappings = [
    '1️⃣',
    '2️⃣',
    '3️⃣',
    '4️⃣',
    '5️⃣',
    '6️⃣',
    '7️⃣',
    '8️⃣',
    '9️⃣',
    '🔟',
];

function getNextIndex(str) {
    let i = 0;
    for (; i < str.length; i += 1) {
        if (str[i] === '"') break;
    }
    return i;
}

function getPollArgs(content) {
    const args = [];

    for (let i = 0; i < content.length; i += 1) {
        if (i + getNextIndex(content.substring(i)) === content.length) {
            args.push(content.substring(i, i + getNextIndex(content.substring(i))));
            break;
        }
        i += getNextIndex(content.substring(i)) + 1;
        const t = getNextIndex(content.substring(i));
        args.push(content.substring(i, i + t));
        i += t + 1;
    }
    return args;
}

function computeMostCollected(collected) {
    const options = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let max = 0;
    const winners = [];

    const results = collected.mapValues((vote) => ({ name: vote.emoji.name, count: vote.count }));
    results.each((vote) => {
        if (indexMappings.includes(vote.name)) {
            options[indexMappings.indexOf(vote.name)] += vote.count;
        }
    });
    for (let i = 0; i < options.length; i += 1) {
        if (options[i] > options[max]) max = i;
    }
    for (let i = 0; i < options.length; i += 1) {
        if (options[i] === options[max]) winners.push(i);
    }
    return winners;
}

function handleCollectedReactions(collected, msg, args, author) {
    const winners = computeMostCollected(collected);
    const endEmbed = new Discord.MessageEmbed()
        .setAuthor('Sondage 📝')
        .setThumbnail(author.avatarURL())
        .setDescription(args[0])
        .setFooter(author.username)
        .setColor(global.mainColor)
        .setTimestamp()
        .addField('Il y a eu le plus de votes pour:', '\u200b');
    winners.forEach((winner) => {
        endEmbed.addField(`"${args[winner + 1]}"`, '\u200b');
    });
    msg.edit({ embeds: [endEmbed], content: `<@${author.id}>` });
}

module.exports = {
    permissions: [],
    description: 'Crée un nouveau sondage. Respectez la mise en page ci-dessous (guillemets)',
    example: 's!poll "Qui suis-je ?" "Quelqu\'un" "Personne" 2min20s',
    async cmd(client, message) {
        const content = message.content.split(' ').slice(1).join(' ');
        const rawArgs = getPollArgs(content);
        const args = rawArgs.filter((arg) => arg.length > 0 && arg);
        const time = parse(args[args.length - 1]);
        if (time !== null) {
            args.pop();
        }
        const embed = new Discord.MessageEmbed()
            .setAuthor('Sondage 📝')
            .setDescription(args[0])
            .setFooter(message.author.username)
            .setColor(global.mainColor)
            .setThumbnail(message.author.avatarURL())
            .setTimestamp();
        args.slice(1).map((arg, index) => embed.addField(`Option   ${indexMappings[index]}`, arg));
        message.channel.send({ embeds: [embed] }).then((msg) => {
            for (let i = 0; i < args.length - 1; i += 1) {
                msg.react(indexMappings[i]);
            }
            if (time) {
                const filter = (reaction) => indexMappings.includes(reaction.emoji.name);
                const collector = msg.createReactionCollector({ filter, time: time || 120000 });
                collector.on('end', (collected) => handleCollectedReactions(collected, msg, args, message.author));
            }
        }).catch((err) => {
            console.log(`[SAE-BOT][ERROR] ${err}`);
        });
    },
};
