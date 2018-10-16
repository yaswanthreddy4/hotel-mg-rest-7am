const host = '127.0.0.1';
const port =3030;
// const dbUrl = 'mongodb://appAdmin:password@192.168.1.41:27017';
const dbUrl = 'mongodb://192.168.1.9:27017/meanhotel';
const dbUser='appAdmin';
const dbPwd='password';
const dbName='meanhotel';
const authSource='admin';
const secretKey = "ThisIsWahidJWTClass7am";
module.exports ={
    PORT:port,
    HOST:host,
    DBURL:dbUrl,
    DBUSR:dbUser,
    DBPWD:dbPwd,
    DBNAME:dbName,
    DBAUTHSRC:authSource,
    SCRTKEY:secretKey
}
