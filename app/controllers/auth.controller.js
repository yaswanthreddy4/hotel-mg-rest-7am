const mongoose = require('mongoose');
var User = mongoose.model('User');
const CONFIG = require('../config');
const bcrypt  = require('bcrypt');
const jwt  = require('jsonwebtoken');

module.exports.tokenValidator =(req,res,next)=>{
    // console.log("authenticator=====");    
    var token = req.headers['x-access-token'];
    if(!token){
        res
        .status(404)
        .json({
            message: "Token Not Found !",
            token:null,
            auth:false
        });
    }else{
        jwt.verify(token,CONFIG.SCRTKEY,function(error,doc){
            if(error){
                res
                .status(401)
                .json({
                    message: "Failed To authencate Token :: Invlaid Token {Unautherized User Incedent Reported}",
                    token:null,
                    auth:false
                });  
            }else{
                // console.log("Documnet ",doc);
                User.findById(doc._id,function(error,user){
                    if(error){
                        res
                        .status(500)
                        .json({
                            message: "User NOt Found Via Token :: Internal Server Error",
                            token:null,
                            auth:false
                        });  
                    }
                    if(!user){
                        res
                        .status(404)
                        .json({
                            message: "User Not Found Via Token",
                            token:null,
                            auth:false
                        });  
                    }else{
                        // res
                        // .status(200).json({
                        //     message: "Valid Token",
                        //     auth:true
                        // });  
                        next(); //Other Function Call After token Verification
                    }
                }); //User find Query
                
            }
        }); //jwt verify
    }
}
module.exports.registration =(req,res,next)=>{
    if ( req.body && req.body.name &&   req.body.email && 
         req.body.password &&  req.body.phoneNumber ){ 
        var saltRounds = 10;
        var salt = bcrypt.genSaltSync(saltRounds);
        var hashPassword = bcrypt.hashSync(req.body.password,salt);      
        var newUser = new User({
            name:req.body.name,
            email:req.body.email,
            password:hashPassword,
            phoneNumber:req.body.phoneNumber,
            role:req.body.role
        });
        newUser.save(function(err,user){
            if(err){
                res
                .status(500)
                .json({
                    message: "Failed to Register a User ..Internal Server Error",
                    error:err
                });
            }else{
                var token  = jwt.sign({_id:user._id},CONFIG.SCRTKEY,{expiresIn:43200})
                res
                .status(200)
                .json({
                    message: "Rgistration SuccessFull !",
                    auth:true,
                    token:token
                    // user:user
                });
            }
        });
    }else{
            res
                .status(404)
                .json({
                    message: "Required Feilds are Missing",
                });
    }
}

module.exports.login =(req,res,next)=>{
    if(req.body && req.body.email && req.body.password){
        User.findOne({email:req.body.email},function(error,user){
            if(error){
                res
                .status(500)
                .json({
                    message: "Failed to Login a User ..Internal Server Error",
                    error:error,
                    auth:false
                });
            }else{
                if(!user){
                res
                .status(404)
                .json({
                    message: "User Not Found! Get Registered",
                    auth:false
                });
                }else{
                    var isPwd = bcrypt.compareSync(req.body.password,user.password)
                    if(!isPwd){
                        res
                        .status(401)
                        .json({
                            message: "Invalid Password !",
                            auth:false
                        });
                    }else{
                    var token  = jwt.sign({_id:user._id},CONFIG.SCRTKEY,{expiresIn:43200})
                        res
                        .status(200)
                        .json({
                            message: "Login SucessFull !",
                            auth:true,
                            token:token
                            // user:user
                        });
                    }  
                }
            }
        })
    }else{
        res
        .status(404)
        .json({
            message: "Required Feilds are Missing",
        });
    }
}