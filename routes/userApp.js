

var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var querystring = require('querystring');

var UserApp = require('../models/userApp');

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

//A modifier pour l'api accessible via android
//Get Commerce by name
router.get('/:_nom', function(req, res){
    var name = req.params._nom;
    console.log(name);
	Commerce.getCommercesByName(position,1, function(err, commerce){
		if(err){
			throw err;
		}
		res.json(commerce);
	});	
});

//A modifier pour l'api accessible via android
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


/*
__________________________________________________________
Commerce.removeCommerce = function(id, callback);
Commerce.addAbonne = function(id,user_id,callback);
Commerce.createCommerce = function(commerce, callback);
Commerce.getCommerceByName = function(name, callback);
Commerce.getCommercesByCategories = function(req, callback);
Commerce.getCommerceById = function(id, callback);
Commerce.getCommerces = function(limit, callback);
Commerce.getCommerces = function(limit, callback);
__________________________________________________________
User.getUsers = function(callback, limit);
User.getCommerces = function(id, callback);
User.createUser = function(newUser, callback);
User.getUserByUsername = function(username, callback);
User.getUserById = function(id,callback);
User.comparePassword = function(candidatePassword, hash, callback);
__________________________________________________________
UserApp.getUserByEmail = function(email, callback)
UserApp.createUser = function(newUser, callback)
UserApp.getUserById = function(id, callback)
UserApp.getCommerces = function(id,callback)
UserApp.updateUser = function(id, info, callback)
UserApp.updateUser = function(id, setting, callback)
__________________________________________________________
ReseauSocial.getAdmin = function(id, callback)
ReseauSocial.getAbonnes = function(id, callback)
ReseauSocial.getReseauxSociauxAbonne = function(id,callback)
ReseauSocial.getReseauxSociauxAdmin = function(id,callback)
ReseauSocial.getReseauSocialById = function(limit, callback)
ReseauSocial.getReseauSocialById = function(id, callback)
ReseauSocial.getReseauSocialByName = function(name, callback)
ReseauSocial.createReseauSocial = function(newReseau, callback)
__________________________________________________________
Offre.getUserById = function(req,callback)
Offre.getUserById = function(id,callback)
Offre.getOffreByPreferences = function(req, callback)
Offre.createOffre = function(newOffre, callback)
Offre.getCommerce = function(id, callback)
Offre.getUsers = function(callback, limit)

*/

