const Axios = require('axios');

function generateMessageSample(params) {
    let content = `s!poll "${params.question}"`;
    params.options.forEach((option) => {
        content += ` "${option}"`;
    });
    if (params.time) {
        content += ` ${params.time}`;
    }
    const channel = global.client.channels.cache.get(params.channelId);
    return { channel, content, author: global.client.user };
}

exports.poll = function (req, res) {
    const message = generateMessageSample(req.body.params);
    Axios.post(`${process.env.BOT_ADDRESS}/poll`, { params: message }).then(() => {
        res.status(200).send({ msg: 'Poll created.' });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ msg: 'An error occurred' });
    });
};
