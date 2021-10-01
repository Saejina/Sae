module.exports = function (emoji) {
    if (emoji.id) {
        return global.client.emojis.cache.get(emoji.id);
    }
    return (emoji.name);
};
