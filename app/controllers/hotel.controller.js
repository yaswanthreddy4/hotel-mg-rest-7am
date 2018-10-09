// var hotelData = require('../models/data/hotel-data.json');
// var conn = require('../models/db.connection');
const mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');
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
    console.log("Add One Hotels Put");
    var filterQuery = { _id: ObjectId(hotelId) };
    var updateQuery = { $set: req.body };
    res.status(200).json({ MESSAGE: "Put request for updateOneHotel" })
}
module.exports.removeOneHotel = (req, res, next) => {
    console.log("Add One Hotels delete");
    res.status(200).json({ MESSAGE: "delete request for removeOneHotel" })
}
module.exports.patchOneHotel = (req, res, next) => {
    console.log("Add One Hotels patch");
    res.status(200).json({ MESSAGE: "patch request for patchOneHotel" })
}
// module.exports.bookHotel =  async (req, res, next) => {
//     console.log(req.params);
//     var hotel = await findOneHotel(req.params.hotelId);
//     console.log("Add One Hotels patch");
//     res.status(200).json(hotel)
// }

// async function findOneHotel(hotelId) {
//     var response =null;
//     var collection = conn.get().db(CONFIG.DBNAME).collection('hotel');
//     collection.findOne({ _id: ObjectId(hotelId) },
//         await function (error, hotel) {
//             if (error) {
//                console.log("Error While Finding Hotel");
               
//             } else {
//                 response=hotel;
//                 console.log(hotel);
                
//             }
//         });
//         return response; 
// }

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