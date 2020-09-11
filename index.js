require('dotenv').config();
const app = require('./app');

const mongoose = require('mongoose');

//levanto el servidor en una funcion asincrona para prevenir posibles errores y evitar callbacks
async function main() {

    await mongoose.connect('mongodb://localhost:27017/cheff-bot', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      }, (err, res) => {
          const status = !!err ? 'Error al conectar la base de datos' : `Data Base success...`;
          console.log(status);
      }
    );

    await app.listen(app.get('port'));
    console.log('Server iniciado en el puerto: ', app.get('port'))
}

main();

setTimeout(() => process.exit(0), 60 * 60 * 1000);