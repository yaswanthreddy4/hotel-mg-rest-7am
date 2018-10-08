const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bolgsSchema = new Schema({
    title:String,
    body:String,
    description:String,
    rating:Number,
    reviews:String,
    isToprated:Boolean,
    createdOn : Date,
    details:[
        {
            head:String,
            body:String,
            image:String
        }
    ],
    data:{
       name:String,
       date:Date.now 
    }
});

mongoose.model('Blog',bolgsSchema,'hotels.blogs')