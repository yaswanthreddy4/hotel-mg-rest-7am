// var hotelData = require('../models/data/hotel-data.json');
// var conn = require('../models/db.connection');
const mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');
var User = mongoose.model('User');
const CONFIG = require('../config');
module.exports.getAllHotels = (req, res, next) => {
    console.log(req.query);
    var offset = 0;
    var count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    Hotel
    .find()
    .skip(offset).limit(count)
    .exec(function (error, hotels) {
            if (error) {
                console.log(error);
                res
                    .status(404)
                    .json({
                        message: "Hotels Records Not Found",
                        error: error
                    });
            } else {
                res
                    .status(200)
                    .json(hotels);
            }
        });
}
module.exports.getOneHotel = (req, res, next) => {
    var hotelId = req.params.hotelId;
    console.log(req.params.hotelId);
    if (req.params && req.params.hotelId) {        
        Hotel
        .findById(hotelId)
        .exec(function (error, hotel) {
                if (error) {
                    res
                        .status(404)
                        .json({
                            message: "Hotel Records Not Found",
                            error: error
                        });
                } else {
                    res
                        .status(200)
                        .json(hotel);
                }
            });
    } else {
        res
            .status(404)
            .json({ message: "Request Params HotelId is Not In Url" })
    }

}
module.exports.addOneHotel = (req, res, next) => {
    console.log("Add One Hotels Post");
    console.log(req.body);
    if (req.body && req.body.name && req.body.stars &&
        req.body.address) {
        var newHotel = new Hotel({
            name:req.body.name,
            stars:req.body.stars,
            'location.address':req.body.address
        });
        newHotel
        .save(function (error, response) {
            if (error) {
                res
                    .status(500).json({
                        message: "Internal Server Error",
                        error: error
                    });
            } else {
                res.status(200).json(response);
            }
        })
    } else {
        res
            .status(200)
            .json({
                message: "Required Feilds For creating Hotel is Missing"
            });
    }
}
module.exports.updateOneHotel = (req, res, next) => {
    try{
        console.log("Update One Hotels Put");
        var hotelId = req.params.hotelId;
        var updateQuery = { $set:{ "name":req.body.name } };
        Hotel
        .findByIdAndUpdate(hotelId,updateQuery,function(error,response){
            if(error) throw error;
            res
            .status(200)
            .json({ 
                message: "Updated One Hotel" ,
                response:"ok"
            });
        });        
    }catch(error){
        res
        .status(500)
        .json({ 
            message: "Error While Update One Hotel" ,
            error:error
        });
    }
    
}
module.exports.allReviewsForOneHotel = (req, res, next) => {
    var hotelId = req.params.hotelId;
    console.log(req.params.hotelId);
    if (req.params && req.params.hotelId) {        
        Hotel
        .findById(hotelId)
        .select('reviews') //for projecting reviews only
        .exec(function (error, reviews) {
                if (error) {
                    res
                        .status(404)
                        .json({
                            message: "Hotel Records Not Found",
                            error: error
                        });
                } else {
                    res
                        .status(200)
                        .json(reviews);
                }
            });
    } else {
        res
            .status(404)
            .json({ message: "Request Params HotelId is Not In Url" })
    }
}
module.exports.OneReviewForHotel = (req, res, next) => {
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log(req.params.hotelId);
    if (req.params && req.params.hotelId && req.params.reviewId) {        
        Hotel
        .findById(hotelId)
        .select('reviews') //for projecting reviews only
        .exec(function (error, reviews) {
                if (error) {
                    res
                        .status(404)
                        .json({
                            message: "Hotel Records Not Found",
                            error: error
                        });
                } else {
                    // console.log("reviewId========="+reviewId);
                    // console.log(reviews);
                    // console.log(reviews.reviews);                    
                    var review = reviews.reviews.id(reviewId)
                    res
                        .status(200)
                        .json(review);
                }
            });
    } else {
        res
            .status(404)
            .json({ message: "Request Params HotelId is Not In Url" })
    }
}
module.exports.removeOneHotel = (req, res, next) => {
    console.log("Add One Hotels delete");
    res.status(200).json({ MESSAGE: "delete request for removeOneHotel" })
}
module.exports.patchOneHotel = (req, res, next) => {
    console.log("Add One Hotels patch");
    res.status(200).json({ MESSAGE: "patch request for patchOneHotel" })
}
module.exports.showBookedHotel =  async (req, res, next) => {
    var userId= req.params.userId;
    console.log(req.params.userId);
    if (req.params && req.params.userId) {        
        User
        .findById(userId)
        .select("bookHistory")
        .exec(function (error, hotels) {
                if (error) {
                    res
                        .status(500)
                        .json({
                            message: "Internal Server Error While Show Hotel History",
                            error: error
                        });
                } else {
                    res
                        .status(200)
                        .json(hotels);
                }
            });
    } else {
        res
            .status(404)
            .json({ message: "Request Params UserId  is Not In Url" })
    }
}


module.exports.bookHotel =  async (req, res, next) => {
    try{
        // console.log(req.params);
    var hotelId= req.params.hotelId;
    var userId= req.params.userId;
    findOneHotelOneUser(hotelId,userId).then((data)=>{
        // console.log(data);        
        // res.status(200).json(data);
        var bookHotelHistory ={ $push:{'bookHistory':[
            { 
                name:data.hotel.name,
                hotelId:data.hotel._id,
                price:data.hotel.rooms[0].price,
                bookingDate:new Date(),
                checkIn: new Date(),
                checkOut: new Date(),
            }
        ]}}
        if(data.user._id){
            User.findByIdAndUpdate(userId,bookHotelHistory,
                function(err,doc){
                if(err){
                    res
                    .set('application/json')
                    .status(500).json({
                        error:err,
                        message:"Booking Is not Completed Due to Server Error"
                    })
                }else{
                    res.status(200)
                    .json({
                        response:true,
                        message:"Booking Completed !"
                    })
                }
            })
        }else{
            res.status(404).json({
                message:"For Booking User Not Found!"
            });
        }
    });  
    }catch(error){
            res.status(500).json(error)
    }
    
}

async function findOneHotelOneUser(hotelId,userId) {
   if(!hotelId){
       throw new Error("Hotel Id Not Found");
   }
   if(!userId){
    throw new Error("User Id Not Found");
    }
   var hotel = await Hotel.findById(hotelId);
   var user = await User.findById(userId);
   return {
       hotel:hotel,
       user:user
   };
}

// function findOneUser(userId) {
//     var response =null;
//     var collection = conn.get().db(CONFIG.DBNAME).collection('hotel.users');
//     collection.findOne({ _id: ObjectId(userId) },
//         function (error, user) {
//             if (error) {
//                console.log("Error While Finding User");
               
//             } else {
//                 response =user;
//             }
//         });
//         return response;
// }