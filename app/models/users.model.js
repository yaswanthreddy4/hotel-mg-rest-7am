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
    name:String,
    role:String,
    phoneNumber:String,
    description:String,
    email:String,
    gender:String,
    lastLogin:Date,
    bookHistory:[hotelBookSchema]
});
mongoose.model('User',usersSchema,'hotels.htusers');
