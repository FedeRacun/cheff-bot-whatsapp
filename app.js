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

app.get('/', function (req, res) {
    res.send('Hello World')
})

let globalLog = ' LOGS ==== ';

// Whatsapp session
const SESSION_FILE_PATH = './session.json';
let sessionCfg;
let sessionEnv;

if (fs.existsSync(SESSION_FILE_PATH)) {
    globalLog = globalLog + '\n Esiste 1 archivo JSON para session';
    sessionCfg = require(SESSION_FILE_PATH);
}

headless = !!sessionCfg;

if (process.env.NODE_ENV == 'prod') {
    sessionEnv = {WABrowserId: process.env.WABrowserId, WASecretBundle: process.env.WASecretBundle, WAToken1: process.env.WAToken1, WAToken2: process.env.WAToken2}
    globalLog = globalLog + '\n ES PROD' + JSON.parse(sessionEnv);
} else {
    globalLog = globalLog + '\n NO ES PROD';
}
const client = new Client({ puppeteer: { headless: true}, session: sessionEnv ? sessionEnv : sessionCfg });

client.initialize();

client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    console.log('QR:', qr);
});

client.on('authenticated', (session) => {
    console.log('Auth success..');
    globalLog = globalLog + '\n Auth success..';
    sessionCfg=session;
    // Si no existe el archivo session, lo creo.
    if(!headless && process.env.NODE_ENV != 'prod') {
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
            if (err) {
                console.error(err);
                globalLog = globalLog + '\nERROR: '+ err;
            }
        });
    }
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessfull
    console.error('AUTHENTICATION FAILURE', msg);
    globalLog = globalLog + '\n AUTHENTICATION FAILURE';
});

client.on('ready', () => {
    console.log('Bot has been a wake-up');
    globalLog = globalLog + '\nBot has been a wake-up';
});

client.on('message', driverMsg);

app.get('/logs', function (req, res) {
    res.send(globalLog)
})

// Exports
global.client = client;
module.exports = app;