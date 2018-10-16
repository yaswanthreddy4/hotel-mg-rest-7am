// require('./app/models/db.connection').open();
require('./app/models/db.conn');
var express= require('express');
const CONFIG= require('./app/config')
var app = express();
// app.set('port',3030);
// app.set('host','127.0.0.1');
var path = require('path');
var bodyParser=require('body-parser')
const homeRoutes =require('./app/routes');
const hotelsRoutes =require('./app/routes/hotel.route');
const usersRoutes =require('./app/routes/users.route');
//require log4js 
const log4js = require('log4js');
const fs = require('fs');
//allow urlencoded data as body 
app.use(bodyParser.urlencoded({extended:false}));
//allows json data as body
app.use(bodyParser.json({type:'application/json'}));

//configure log4js
log4js.configure('./app/config/log4js.json');
var startupLogger = log4js.getLogger('startup');
var accessLogger = log4js.getLogger('access');

//create Logs Directories
try{
    fs.mkdirSync('./logs');
}catch(error){
    if(error.code !='EEXIST'){
        console.error("Could Not setup Log Directory",error);
        process.exit(1);
    }
}

//middle fun for hosting static data
// app.use(express.static(path.join(__dirname,'public')));

//access point (method that signify the routes path and method)
app.use(function(req,res,next){
    // console.log(req.method +"    "+req.url);
    accessLogger.info(" Uri Hit :"+ req.method +"    "+req.url);
    next();
});
//router linking
app.use('/',homeRoutes);
app.use('/api',hotelsRoutes);
app.use('/api',usersRoutes);



console.log("I m Last Statement Of Server File");

//server creation 
app.listen(CONFIG.PORT,CONFIG.HOST,function(){
    console.log("Server is Runnning on http://127.0.0.1:"+CONFIG.PORT);
    startupLogger.info("Server is Runnning on http://127.0.0.1:"+CONFIG.PORT);
    startupLogger.info("-----------------------------------------------------");
});