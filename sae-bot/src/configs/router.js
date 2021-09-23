const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const poll = require('../commands/poll');

const configRoutes = (app) => {
    app.post('/poll', (req, res) => { poll.cmd(global.client, req.body.params); res.status(200).send({}); });
};

const configure = (app) => {
    app.use(express.json());
    app.use(cors({
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }));
    app.use(bodyParser.urlencoded({ extended: true }));
    configRoutes(app);
};

const app = express();
configure(app);
app.listen(process.env.PORT || 5001, () => {
    console.log(`[SAE-BOT] App listening on port ${process.env.PORT}` || 5001);
});
