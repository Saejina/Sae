const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname + '/.env') });
require('./config/db');

const app = express();

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`)
})