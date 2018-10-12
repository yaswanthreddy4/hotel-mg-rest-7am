const mongoose = require('mongoose');
var hotelBookSchema = mongoose.Schema({
    name:String,
    hotelId:String,
    bookingDate:Date,
    price:Number,
    checkIn:Date,
    checkOut:Date
});
var usersSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    role:{
        type:String,
        "default":"user"
    },
    phoneNumber:String,
    description:String,
    email:{
        type:String,
        unique:true,
        required:true
    },
    gender:String,
    lastLogin:Date,
    bookHistory:[hotelBookSchema],
    password:String
});
mongoose.model('User',usersSchema,'hotels.htusers');
