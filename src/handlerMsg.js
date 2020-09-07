const {actions} = require ('./actions');

const handlerMsg = async msg => {
    console.log(`📩${msg.body}`);

    actions(msg);
}

module.exports = {
    handlerMsg
}