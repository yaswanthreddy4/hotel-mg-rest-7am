const mongoose = require('mongoose');
const CONFIG = require('../config');
require('./hotels.model'); //register model
require('./users.model'); //register model

const OPTIONS ={
    user:CONFIG.DBUSR,
    pass:CONFIG.DBPWD,
    authSource:CONFIG.DBAUTHSRC,
    useNewUrlParser:true
};
mongoose.connect(CONFIG.DBURL,OPTIONS);

var  _conn = mongoose.connection;
_conn.on('error',function(error){
    console.log("Connection Failed Vai Mongoose !");
    console.log(error);    
});

_conn.once('open',function(){
    console.log("Connection SuccessFull Vai Mongoose !");
});

function graceFullShutDown(signal,callback){
    mongoose.connection.close();
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