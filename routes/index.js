//  +___________________________________+ 
//  | API pour l'application commercant |
//  |___________________________________|

var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

var User = require('../models/user');
var Commerce = require('../models/commerce');
var Offre = require('../models/offres');

var googleMapsClient = require('@google/maps').createClient({
	key: 'AIzaSyAPsN7xhUSMDdgG8adlUfShMsvjhErgtiQ '
  });

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	User.getCommerces(req.user._id, function(err, commerces){
		if(err) throw err;
		else{
			res.render('index',{
				commerces : commerces
			});
		}
	});
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
		
	}
}

//Affiche l'utilisateur connecté
router.get('/me', ensureAuthenticated, function(req, res){
	res.json(req.user);
});
	
//Affiche la liste des commercants
router.get('/users', function(req, res){
	User.getUsers(function(err, users){
		if(err){
			throw err;
		}
		res.json(users);
	});	
});

//Supprime le commerce selectionné
router.post('/delete', function(req, res){
	var id = req.body.select;
	req.user.commerces.pull(id);
	Commerce.removeCommerce(id, function(err, commerce){
		console.log("Supression : "+commerce);
	});
	req.user.save(function(err, user){
		User.getCommerces(user._id, function(err, commerces){
			if(err) throw err;
			else{
				res.render('index',{
					id:id,
					commerces : commerces
				});
			}
		});	
	});	
});

//Ajoute une offre de commerce selectionné
router.post('/offre', function(req, res){
	var id = req.body.select;

	Offre.crea
});

// Creation d'un commerce et liaison avec le commercant 
router.post('/', function(req, res){
	var nom = req.body.nom;
	var marque = req.body.marque;
	var adresse = req.body.adresse;
	var categorie = req.body.categorie.split(" ");
	var latitude ;
	var longitude ;

	// Validation
	req.checkBody('nom', 'Un nom de commerce est necessaire').notEmpty();
	req.checkBody('marque', 'Une marque de commerce est necessaire').notEmpty();
	req.checkBody('adresse', 'Une adresse est necessaire').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('index',{
			errors : errors
		});
	} else {

		// Transforme l'adresse en position avec l'api google.
		googleMapsClient.geocode({
			address: adresse
  		}, function(err, response) {
		if (!err) {
			latitude = response.json.results[0].geometry.location.lat;
			longitude = response.json.results[0].geometry.location.lng;
		
		 //Creation d'une variable commerce contenant les informations données
		var newCommerce = new Commerce({
			nom: nom,
			marque: marque,
			position : {
				lat : latitude, 
				lng : longitude,
				adresse : adresse
			}
		});

		//Ajout un par un des catégories dans la variable de commerce
		for(var i=0;i<categorie.length;i++){
			newCommerce.categories.push(categorie[i]);
		}

		//Création en BDD du commerce et ajout de celui-ci à la liste de commerces de l'utilisateur connecté
		Commerce.createCommerce(newCommerce, function(err, commerce){
			if(err) throw err;
			console.log("Ajout commerce : "+commerce.nom);

			req.user.commerces.push(commerce._id);
			req.user.save(function(err, user){
				if(err) throw err;
			});
		
		

		req.flash('success_msg', 'Votre Commerce a bien été crée !');

		res.redirect('/');
		});
	}else{
		console.log(err);
	}
 });
	}
});

//Réccupère les commerces de l'utilisateurs
router.get('/commercesMe', function(req, res){
	User.getCommerces(req.user._id, function(err, commerces){
		if(err){
			throw err;
		}
		res.json(commerces);
	});	
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