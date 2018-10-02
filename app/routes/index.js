var express = require('express');
var router = express.Router();
const homeCtrl  = require('../controllers/home.controller')

router
.route('/')
.get(homeCtrl.homeFun);

router
.route('/json')
.get(homeCtrl.senJsonData);

module.exports= router;