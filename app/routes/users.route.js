var express = require('express');
var router = express.Router();
const userCtrl  = require('../controllers/users.controller');
const authCtrl  = require('../controllers/auth.controller');
const hotelCtrl  = require('../controllers/hotel.controller')

router
.route('/user/new')
.post(userCtrl.addOneUser);

router
.route('/user/:userId')
.get(userCtrl.getOneUser);

router
.route('/user/showHotels/:userId')
.get(hotelCtrl.showBookedHotel);

router
.route('/user/register')
.post(authCtrl.registration);

router
.route('/user/login')
.post(authCtrl.login);
module.exports= router;
