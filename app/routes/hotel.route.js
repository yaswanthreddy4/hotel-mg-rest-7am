var express = require('express');
var router = express.Router();
const hotelCtrl  = require('../controllers/hotel.controller')

router
.route('/hotels')
.get(hotelCtrl.getAllHotels);

router
.route('/hotel/:hotelId')
.get(hotelCtrl.getOneHotel)
.put(hotelCtrl.updateOneHotel)
.patch(hotelCtrl.patchOneHotel)
.delete(hotelCtrl.removeOneHotel);
router
.route('/hotel/new')
.post(hotelCtrl.addOneHotel);

router
.route('/hotel/:hotelId/reviews')
.get(hotelCtrl.allReviewsForOneHotel);

router
.route('/hotel/:hotelId/reviews/:reviewId')
.get(hotelCtrl.OneReviewForHotel);

router
.route('/bookhotel/:hotelId/:userId')
.get(hotelCtrl.bookHotel);

// router
// .route('/bookhotel/:hotelId/:userId')
// .get(hotelCtrl.bookHotel);

module.exports= router;