module.exports.homeFun= (req,res)=>{
    console.log(req.url);
    console.log(req.method);
    console.log('GOt GEt Req on :',req.url);    
    res
    .status(200)
    .send('Home Page By Router');
}
module.exports.senJsonData=function(req,res){
    var jhonson ={
        name:"JohnSon",
        type:"powder",
        seller:"xxx-yyy-zzz"
    }
    res.status(200)
    .json(jhonson)
};