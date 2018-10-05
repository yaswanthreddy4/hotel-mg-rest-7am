const host = '127.0.0.1';
const port =3030;
const dbUrl = 'mongodb://appAdmin:password@192.168.1.41:27017';
const dbUser='appAdmin';
const dbPwd='password';
const dbName='meanhotel';
const authSource='admin';

module.exports ={
    PORT:port,
    HOST:host,
    DBURL:dbUrl,
    DBUSR:dbUser,
    DBPWD:dbPwd,
    DBNAME:dbName,
    DBAUTHSRC:authSource
}
