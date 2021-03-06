const mysql = require('mysql2');

let connection;

function setupDatabase() {
    connection.query(`CREATE TABLE IF NOT EXISTS platformUsers (
        id int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
        discord_id varchar(255) NOT NULL,
        username varchar(255) NOT NULL,
        password varchar(255) NOT NULL
    )`, (err) => {
        if (err) throw err;
    });
    connection.query(`CREATE TABLE IF NOT EXISTS platformPerms (
        id int(11) NOT NULL REFERENCES platformUsers (id),
        administrator BOOLEAN NOT NULL DEFAULT false,
        community BOOLEAN NOT NULL DEFAULT false,
        commands BOOLEAN NOT NULL DEFAULT false,
        FOREIGN KEY (id)
        REFERENCES platformUsers (id)
        ON DELETE CASCADE
    )`, (err) => {
        if (err) throw err;
    });
}

function handleDisconnect() {
    console.log('[SAE-BOT][MYSQL] Setting up database...');
    if (!process.env.DB_HOST || !process.env.MYSQL_USER
        || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
        console.log('[SAE-BOT][MYSQL][ERROR] Could not find database informations, '
        + 'make sure your .env file follows the example.');
        process.exit(1);
    }
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        charset: 'utf8mb4',
    });
    connection.connect((err) => {
        console.log('[SAE-BOT][MYSQL] Connecting to database...');
        if (err) {
            console.log(`[SAE-BOT][MYSQL][ERROR] Could not connect to database. Code: ${err}`);
            setTimeout(handleDisconnect, 2000);
        } else {
            console.log('[SAE-BOT][MYSQL] Successfully connected to database !');
            setupDatabase();
        }
    });
    connection.on('error', (err) => {
        console.log(`[SAE-BOT][MYSQL][ERROR] Database error: ${err}`);
        if (err.code === 'PROTOCOL_CONNEXION_LOST') handleDisconnect();
        else process.exit(1);
    });
    global.database = connection;
}

handleDisconnect();
