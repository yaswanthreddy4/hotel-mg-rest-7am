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
            console.log("DB Connection Failure !!");
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
function graceFullShutDown(signal,callback){
    connection.close();
    console.log("Mongodb Connection Object closed ");
    console.log("App Termination Due To "+signal);
    callback();
}
process.on('SIGINT',function(){
    graceFullShutDown('SIGINT',function(){
        process.exit(0);    
    });
});
process.on('SIGTERM',function(){
    graceFullShutDown('SIGTERM',function(){
        process.exit(0);    
    });
});

process.on('SIGQUIT',function(){
    graceFullShutDown('SIGQUIT',function(){
        process.exit(0);    
    });
});
process.once('SIGUSR2',function(){
    graceFullShutDown('SIGUSR2',function(){
        process.kill(process.pid,'SIGUSR2')   
    });
});