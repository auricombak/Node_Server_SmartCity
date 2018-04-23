

var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

var User = require('../models/user');
var Commerce = require('../models/commerce');

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

router.get('/me', ensureAuthenticated, function(req, res){
	res.json(req.user);
});
	

router.get('/users', function(req, res){
	User.getUsers(function(err, users){
		if(err){
			throw err;
		}
		res.json(users);
	});	
});

router.post('/delete', function(req, res){
	var id = req.body.select;
	req.user.commerces.pull(id);
	Commerce.removeCommerce(id, function(err, commerce){
		console.log("BABABA"+commerce);
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

// Add Commerce to an user 
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

		//TODO : split la categorie en array et lui donner l'array
		// Geocode an address.
		googleMapsClient.geocode({
			address: adresse
  		}, function(err, response) {
		if (!err) {
			latitude = response.json.results[0].geometry.location.lat;
			longitude = response.json.results[0].geometry.location.lng;
		
		 
		var newCommerce = new Commerce({
			nom: nom,
			marque: marque,
			position : {
				lat : latitude, 
				lng : longitude,
				adresse : adresse
			}
		});

		for(var i=0;i<categorie.length;i++){
			newCommerce.categories.push(categorie[i]);
		}

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

router.get('/commercesMe', function(req, res){
	User.getCommerces(req.user._id, function(err, commerces){
		if(err){
			throw err;
		}
		res.json(commerces);
	});	
});

router.get('/commerces', function(req, res){
	Commerce.getCommerces( function(err, commerces){
		if(err){
			throw err;
		}
		res.json(commerces);
	});	
});

//A modifier pour l'api accessible via android
//Get commerce by distance
router.get('/commercesD', function(req, res){
	var position = { latitude : "43.625599" , longitude : "3.861361" };
	Commerce.getCommercesByDistances(position,1, function(err, commerces){
		if(err){
			throw err;
		}
		res.json(commerces);
	});	
});

//A modifier pour l'api accessible via android
//Get Commerce by name
router.get('/commercesN', function(req, res){
	var name = "name";
	Commerce.getCommercesByName(position,1, function(err, commerce){
		if(err){
			throw err;
		}
		res.json(commerce);
	});	
});

//A modifier pour l'api accessible via android
//Get Commerces by array of category
router.get('/commercesC', function(req, res){
	var categories = ["indien"];
	Commerce.getCommercesByCategories(categories, function(err, commerces){
		if(err){
			throw err;
		}
		res.json(commerces);
	});	
});

module.exports = router;