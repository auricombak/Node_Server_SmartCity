

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

//GET N commerces
router.get('/:_limit', function(req, res){
    var limit = parseInt(req.params._limit);
    console.log(limit);
	Commerce.getCommerces( limit, function(err, commerces){
		if(err){
			throw err;
		}
		res.json(commerces);
	});	
});


//GET N commerces les plus proches de la postition donnée
router.get('/:_lat/:_lng/:_limit', function(req, res){
    var limit = parseInt(req.params._limit);
	var position = { latitude : req.params._lat , longitude : req.params._lng };
	Commerce.getCommercesByDistances(position,limit, function(err, commerces){
		if(err){
			throw err;
		}
		res.json(commerces);
	});	
});


//Get Commerce by name
router.get('/nom/:_nom', function(req, res){
    var name = req.params._nom;
    console.log(name);
	Commerce.getCommerceByName(name, function(err, commerce){
		if(err){
			throw err;
		}
		res.json(commerce);
	});	
});


//Get Commerces by array of category
router.get('/', function(req, res){
    var query = querystring.parse(req.url.split('?')[1]);
    console.log(query);
    var array;
    if (!Array.isArray(query.categories)){
        array = [query.categories];
    }else{
        array = query.categories;
    }
    if(query.categories){
        Commerce.getCommercesByCategories(array, function(err, commerces){
            if(err){
                throw err;
            }
            res.json(commerces);
        });	
    }
});

module.exports = router;



