

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

