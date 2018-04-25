

var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var querystring = require('querystring');

var User = require('../models/user');
var Commerce = require('../models/commerce');

var googleMapsClient = require('@google/maps').createClient({
	key: 'AIzaSyAPsN7xhUSMDdgG8adlUfShMsvjhErgtiQ '
  });


// Get Homepage
/*
router.get('/', function(req, res){
	res.render('accueilApi');
});
*/
module.exports = router;

