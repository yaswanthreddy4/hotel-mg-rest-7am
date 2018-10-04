const MongoClient = require('mongodb').MongoClient;
const CONFIG = require('../config');
const OPTIONS ={
    user:CONFIG.DBUSR,
    pass:CONFIG.DBPWD,
    authSource:CONFIG.DBAUTHSRC
}
MongoClient.connect(CONFIG.DBURL,OPTIONS,
    function(error,client){
    if(error){
        console.log("DB Connection Failure !!!");
        console.log(error);
        
    }else{
        var db = client.db(CONFIG.DBNAME);
        console.log("DB CONNection SuccessFull !!");
        console.log(db);
        client.close(); // This close mongodb connection
    }
});