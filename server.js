var express= require('express');
var app = express();
app.set('port',3030);
app.set('host','127.0.0.1');
var path = require('path');
var bodyParser=require('body-parser')
const homeRoutes =require('./app/routes');
const hotelsRoutes =require('./app/routes/hotel.route');
//allow urlencoded data as body 
app.use(bodyParser.urlencoded({extended:false}));
//allows json data as body
app.use(bodyParser.json({type:'application/json'}));
//allow text data as req body 
// app.use(bodyParser.text({type:'text/plain'}));
// app.use(bodyParser.text({type:'text/xml'}));
// app.use(bodyParser.text({type:'text/html'}));
//allow raw data as req body ass all media type but data processed as buffer
// app.use(bodyParser.raw({type:'text/*',limit:'100kb'}));
// app.use(bodyParser.raw({ type: 'application/json' }))

//middle fun for hosting static data
// app.use(express.static(path.join(__dirname,'public')));

//access point (method that signify the routes path and method)
app.use(function(req,res,next){
    console.log(req.method +"    "+req.url);
    next();
});
//router linking
app.use('/',homeRoutes);
app.use('/api',hotelsRoutes);



console.log("I m Last Statement Of Server File");

//server creation 
app.listen(app.get('port'),app.get('host'),function(){
    console.log("Server is Runnning on http://127.0.0.1:"+app.get('port'));
});