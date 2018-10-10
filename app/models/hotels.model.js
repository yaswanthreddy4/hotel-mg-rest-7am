const mongoose = require('mongoose');
var roomsSchema = mongoose.Schema({
    type:String,
    number:String,
    description:String,
    photos:[String],
    price:Number,
});
var locationSchema = mongoose.Schema({
    address:String,
    coordinates:[Number]
});
var reviewsSchema = mongoose.Schema({
    name:String,
    id:String,
    review:String,
    rating:Number
});
var hotelSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        dropDups:true
    },
    description:String,
    stars:{
        type:Number,
        min:0,
        max:5,
        "default":0
    },
    photos:[String],
    currency:String,
    rooms:[roomsSchema],
    location:locationSchema,
    services:[String],
    reviews:[reviewsSchema]
    // versionKey:'v1'
});

mongoose.model('Hotel',hotelSchema,'hotels');