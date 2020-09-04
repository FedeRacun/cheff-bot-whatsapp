// const { Location } = require('whatsapp-web.js');

function checkType(msg) {
    const isAction = msg.body.startsWith('#')

    if (isAction) {
        msg.body = msg.body.toLowerCase();
        msg.body = msg.body.replace(/\s/g, '');

    } else {
        return client.sendMessage(msg.from, `Perdon, aun estoy aprendiendo 🤓
Solo puedo entender mensajes de una sola palabra que tengan un '#' al principio ej:
#veggie`);
    }

    switch (isAction) {
        case msg.body == '!ping':
            client.sendMessage(msg.from, 'pong');
            break;

        case (msg.body == '#facil' || msg.body == "#fácil"):
            client.sendMessage(msg.from, 'simple');
            break;

        case msg.body == '#medio':
            client.sendMessage(msg.from, 'medio');
            break;

        case (msg.body == '#dificil' || msg.body == "#difícil"):
            client.sendMessage(msg.from, 'dificil');
            break;

        default:
            client.sendMessage(msg.from, `Lo siento, encontre nada 😔
las opciones que conozco son:
#facil
#medio
#dificil
#vegetariano
#vegano

Tambien podes agregar F, M o D al final de vegano o vegatariano para indicarle la dificultad, ej: #veganoM (receta vegana difultad media)`
            );
            break;

    }

}

module.exports = {
    checkType
};