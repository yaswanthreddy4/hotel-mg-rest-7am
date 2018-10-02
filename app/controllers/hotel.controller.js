var hotelData = require('../models/data/hotel-data.json');

module.exports.getAllHotels= (req,res,next)=>{
    console.log(req.query);
    var offset = 0;
    var count = 5;
    if(req.query && req.query.offset && req.query.count){
        offset = parseInt(req.query.offset,10);
        count = parseInt(req.query.count,10);
    }  
    var hotels = hotelData.slice(offset,offset+count)
    res
    .status(200)
    .json(hotels);
}
module.exports.getOneHotel= (req,res,next)=>{
    console.log(req.url);
    console.log(req.params.hotelId);
    if(req.params && req.params.hotelId){
        var hotel = hotelData[req.params.hotelId]
        res
        .status(200)
        .json(hotel)
    }else{
        res
        .status(404)
        .json({message:"Request Params is Not In Url"})
    }
    
}
module.exports.addOneHotel= (req,res,next)=>{
    console.log("Add One Hotels Post");
    res.status(200).json({MESSAGE:"Post request"})
}
module.exports.updateOneHotel= (req,res,next)=>{
    console.log("Add One Hotels Put");
    res.status(200).json({MESSAGE:"Put request for updateOneHotel"})
}
module.exports.removeOneHotel= (req,res,next)=>{
    console.log("Add One Hotels delete");
    res.status(200).json({MESSAGE:"delete request for removeOneHotel"})
}
module.exports.patchOneHotel= (req,res,next)=>{
    console.log("Add One Hotels patch");
    res.status(200).json({MESSAGE:"patch request for patchOneHotel"})
}