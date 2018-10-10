const mongoose = require('mongoose');
var usersSchema = mongoose.Schema({
    name:String,
    role:String,
    phoneNumber:String,
    description:String,
    email:String,
    gender:String,
});
mongoose.model('User',usersSchema,'hotels.htusers');
