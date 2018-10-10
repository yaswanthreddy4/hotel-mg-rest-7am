var express = require('express');
var router = express.Router();
const userCtrl  = require('../controllers/users.controller')

router
.route('/user/new')
.post(userCtrl.addOneUser);

router
.route('/user/:userId')
.get(userCtrl.getOneUser);

module.exports= router;
