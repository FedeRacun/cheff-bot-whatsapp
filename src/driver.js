const {checkActions} = require ('./actions');

const driverMsg = async msg => {

    checkActions(msg);

    const contact = await msg.getContact()
    console.log(`--${contact.name ? contact.name : contact.pushname}: ${msg.body}`);
}

module.exports = {
    driverMsg
}