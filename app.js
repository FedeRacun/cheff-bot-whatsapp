// NPM Packages
const { Client } = require('whatsapp-web.js');
const express = require('express');
const cors = require('cors');

// NodeJs packages
const fs = require('fs');

// Files
const {driverMsg} = require ('./src/driver');
const app = express();

// Server Config
app.set('port',process.env.PORT);

//  MIDDLEWARES
app.use(cors());
app.use(express.json());


// Whatsapp session
const SESSION_FILE_PATH = './session.json';
let sessionCfg;
let sessionEnv;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH);
}

headless = !!sessionCfg;

if (process.env.NODE_ENV == 'prod') {
    sessionEnv = {WABrowserId: process.env.WABrowserId, WASecretBundle: process.env.WASecretBundle, WAToken1: process.env.WAToken1, WAToken2: process.env.WAToken2}
} else {

}
const client = new Client({ puppeteer: { headless }, session: sessionEnv ? sessionEnv : sessionCfg });

client.initialize();

client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    console.log('QR:', qr);
});

client.on('authenticated', (session) => {
    console.log('Auth success..');
    sessionCfg=session;

    // Si no existe el archivo session, lo creo.
    if(!headless && process.env.NODE_ENV != 'prod') {
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
            if (err) {
                console.error(err);
            }
        });
    }
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessfull
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('Bot has been a wake-up');
});

client.on('message', driverMsg);

// Exports
global.client = client;
module.exports = app;