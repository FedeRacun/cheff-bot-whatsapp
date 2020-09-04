const {checkType} = require ('./type');

const controllerMsg = async msg => {
    console.log(`📩${msg.body}`);

    checkType(msg);
}

module.exports = {
    controllerMsg
}