const MongoClient = require('mongodb').MongoClient;
const CONFIG = require('../config');
// const OPTIONS ={
//     user:CONFIG.DBUSR,
//     pass:CONFIG.DBPWD,
//     authSource:CONFIG.DBAUTHSRC
// }
var connection =null;
var open = function(){
    MongoClient.connect(CONFIG.DBURL,{authSource:'admin'},
        function(error,client){
        if(error){
            console.log("DB Connection Failure !!!");
            console.log(error);
            
        }else{
            connection = client;
            // var db = client.db(CONFIG.DBNAME);
            console.log("DB CONNection SuccessFull !!");
        }
    });
}
var get = function(){
    return connection;
}

module.exports ={
    open:open,
    get:get
}