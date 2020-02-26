////////////////////////
///Puerto
/////////////////////////

process.env.PORT = process.env.PORT || 3000;

////////////////////////
///Entorno
/////////////////////////
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

////////////////////////
///Vencimiento del Token
/////////////////////////
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

////////////////////////
///SEED
/////////////////////////

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'

////////////////////////
///Base de datos
/////////////////////////

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

////////////////////////
///Google Client ID
/////////////////////////

process.env.CLIENT_ID = process.env.CLIENT_ID || "933696127070-hm223k5f1lgeg7est09ggfsstnh533hc.apps.googleusercontent.com";