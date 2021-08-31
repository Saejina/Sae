const express = require('express');
const path = require('path');
const {handleLogin, isLoggedIn} = require('./routes/login');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

require('dotenv').config({ path: path.resolve(__dirname + '/.env') });
require('./config/db');

const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    key: "userId",
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
        sameSite: "none",
        secure: "auto"
    },
}))

app.post('/login', (req, res) => {
    return handleLogin(req, res);
});

app.get('/login', (req, res) => {
    return isLoggedIn(req, res);
});

app.listen(process.env.PORT, () => {
    console.log(`[SAE-APP]App listening on port ${process.env.PORT}`)
});