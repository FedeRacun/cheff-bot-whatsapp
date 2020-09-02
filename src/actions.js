const fetch = require('node-fetch');
const Twit = require('twit');

const { Location } = require('whatsapp-web.js');
// APIS
const getDolar = async () => {
    try {
        const baseURL = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';
        const response = await fetch(baseURL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
const tClient = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret
});

// Twitter TOP 10 Trends
const apiTrends = tClient.get('trends/place',{id: '23424747'});
let top10 = `Las tendencias son:

`;
apiTrends.then(res => {
    const trends = res.data[0].trends;
    for (let i = 0; i < 10; i++) {
        top10 += `${i+1}: ${trends[i].name}
`;
    };
});

function checkActions(msg) {

    const isAction = msg.body.startsWith('!')

    if (isAction) {
        msg.body = msg.body.toLowerCase();
        msg.body = msg.body.replace(/\s/g, '');
    } else {
        return;
    }

    console.log('El comando procesado es: ', msg.body);

    switch (isAction) {
        case msg.body == '!ping':
            client.sendMessage(msg.from, 'pong');
            break;

        // [ DOLAR ]
        case msg.body == '!dolar':
            getDolar().then(res => {
                client.sendMessage(msg.from,`Oficial:\ncompra: ${res[0].casa.compra}\nVenta: ${res[0].casa.venta}\nBlue:\nCompra: ${res[1].casa.compra}\nVenta: ${res[1].casa.venta}`
                )
            });
            break;

        // [ TWITTER ]
        case msg.body == '!twitter':
            client.sendMessage(msg.from, top10);

            break;

        case msg.body == '!location':
            msg.reply(new Location(-34.7970084,-58.4301014, 'Llavallol\nLa 5L, de tok!'));
            client.sendMessage(msg.from, 'y... el tema no podia faltar\nhttps://www.youtube.com/watch?v=1NgzwObesKE')
            break;

        default:
            client.sendMessage(msg.from, 'No me mandes boludeces, tomá, relajate y goza https://www.youtube.com/watch?v=taND0Qxtqy0');
            break;
    }
}

module.exports = {
    checkActions
};