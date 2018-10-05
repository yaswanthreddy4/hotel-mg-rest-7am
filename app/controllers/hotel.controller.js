var hotelData = require('../models/data/hotel-data.json');
var conn =require('../models/db.connection');
const CONFIG = require('../config');
var ObjectId=require('mongodb').ObjectId;
module.exports.getAllHotels= (req,res,next)=>{
    console.log(req.query);
    var db =conn.get().db(CONFIG.DBNAME);
    var collection  = db.collection('hotel');
    var offset = 0;
    var count = 5;
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,10);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count,10);
    }
    collection
    .find({}).skip(offset).limit(count)
    .toArray(function(error,hotels){
        if(error){
            console.log(error);
            res
            .status(404)
            .json({
                message:"Hotels Records Not Found",
                error:error
            });
        }else{
            res
            .status(200)
            .json(hotels); 
        }
    });
}
module.exports.getOneHotel= (req,res,next)=>{
    var hotelId =req.params.hotelId;
    console.log(req.params.hotelId);
    var collection =conn.get().db(CONFIG.DBNAME).collection('hotel');
    if(req.params && req.params.hotelId){
        collection.findOne({_id:ObjectId(hotelId)},
            function(error,hotel){
                if(error){
                    res
                    .status(404)
                    .json({
                        message:"Hotel Records Not Found",
                        error:error
                    });
                }else{
                    res
                    .status(200)
                    .json(hotel); 
                }
        });
    }else{
        res
        .status(404)
        .json({message:"Request Params HotelId is Not In Url"})
    }
    
}
module.exports.addOneHotel= (req,res,next)=>{
    console.log("Add One Hotels Post");
    console.log(req.body);
    if(req.body && req.body.name && req.body.stars &&
        req.body.address ){
        var collection =conn.get().db(CONFIG.DBNAME).collection('hotel');
        collection.insertOne(req.body,function(error,response){
            if(error){
                res
                .status(500).json({
                    message:"Internal Server Error",
                    error:error
                });
            }else{
                res.status(200).json(response); 
            }
        })
    }else{
        res
        .status(200)
        .json({
            message:"Required Feilds For creating Hotel is Missing"
        });
    }    
}
module.exports.updateOneHotel= (req,res,next)=>{
    console.log("Add One Hotels Put");
    var filterQuery ={_id:ObjectId(hotelId)};
    var updateQuery ={ $set:req.body};
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