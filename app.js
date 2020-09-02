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

let headless = true
let sessionEnv;
let sessionJson;
let SESSION_FILE_PATH;
const isProd = process.env.NODE_ENV == 'prod';

let hasAnyError = '';
// Whatsapp session
if (isProd) {

    console.log('Estamos en prod');
    sessionEnv = {
        WABrowserId: process.env.WABrowserId,
        WASecretBundle: process.env.WASecretBundle,
        WAToken1: process.env.WAToken1,
        WAToken2: process.env.WAToken2
    }

    //sessionEnv = JSON.stringify(sessionEnv);

} else {

    console.log('Estamos en Dev');
    SESSION_FILE_PATH = './session.json';

    if (fs.existsSync(SESSION_FILE_PATH)) {
        sessionJson = require(SESSION_FILE_PATH);
    } else {
        hasAnyError = hasAnyError + 'NO EXISTE EL ARCHIVO'
        headless = false;
    }
}

const client = new Client({ puppeteer: { headless }, session: isProd ? sessionEnv : sessionJson });

client.initialize()

client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    console.log('QR:', qr);
    hasAnyError = hasAnyError + 'Genere un QR'
});

client.on('authenticated', (session) => {
    console.log('Auth success..');

    sessionJson = session;
    // Si no existe el archivo session, lo creo.
    if(!headless && !isProd) {
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

    hasAnyError = hasAnyError + ' falle'
});

client.on('ready', () => {
    console.log('Bot has been a wake-up');
});

client.on('message', driverMsg);


app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/logs', function (req, res) {
    res.send(`Is Prod: ${isProd}
    ${isProd ? sessionEnv : JSON.stringify(sessionJson)},
    ERROR: ${hasAnyError}`)
})

// Exports
global.client = client;
module.exports = app;