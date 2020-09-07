// NPM Packages
const { Client } = require('whatsapp-web.js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// NodeJs packages
const fs = require('fs');

// Files
const {handlerMsg} = require ('./src/handlerMsg');
const app = express();

// Server Config
app.set('port',process.env.PORT);

//  MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(express.json());


// RUTAS
app.use(require('./src/routes/routes'));



// variables requeridas
let headless = true
let sessionEnv;
let sessionJson;
let SESSION_FILE_PATH;
const isProd = process.env.NODE_ENV == 'prod';

// Whatsapp session
if (isProd) {
    sessionEnv = {
        WABrowserId: process.env.WABrowserId,
        WASecretBundle: process.env.WASecretBundle,
        WAToken1: process.env.WAToken1,
        WAToken2: process.env.WAToken2
    }

} else {
    // Si no es prod, busca un archivo session con las credenciales
    SESSION_FILE_PATH = './session.json';
    if (fs.existsSync(SESSION_FILE_PATH)) {
        sessionJson = require(SESSION_FILE_PATH);

    } else {
        // headless false abre un chromium para iniciar un whatsapp web
        headless = false;
    }
}

// Instanciamos el cliente de whatsapp web y lo inicializamos
const client = new Client({ puppeteer: { headless }, session: isProd ? sessionEnv : sessionJson });
client.initialize()

// Si por algun motivo no abre el chromium podes copiar el codigo que da en consola y transformarlo en un QR
client.on('qr', (qr) => {
    console.log('QR:', qr);
});

client.on('authenticated', (session) => {
    console.log('Auth success..');
    sessionJson = session;
    // Si no existe el archivo session y no estoy en prod lo creo.
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
});

client.on('ready', () => {
    console.log('Bot has been a wake-up');
});

client.on('message', handlerMsg);

// Exports
global.client = client;
module.exports = app;
