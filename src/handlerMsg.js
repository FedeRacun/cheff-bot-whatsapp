const {actions} = require ('./actions');

const handlerMsg = async msg => {
    let contact = await msg.getContact();
    let user = contact.name ? contact.name : contact.pushname
    console.log(`📩 ${user}-- ${msg.body}`);
    msg.body = msg.body.toLowerCase();

    if(msg.body.includes('sugerencia')) {
        client.sendMessage( process.env.NUMBER, `${user} te sugiere: ${msg.body}`);
        return client.sendMessage(msg.from, 'Sugerencia anotada, muchas gracias ☺️');
    }

    if(msg.body.includes('hola')) {
       return client.sendMessage(msg.from, 'Hola, gracias por contactarme!, escribe opciones para ver todos las opciones que puedo ofrecerte');

    }

    actions(msg);
}

module.exports = {
    handlerMsg
}