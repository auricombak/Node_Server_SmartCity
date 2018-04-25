



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


  function commonJSON(obj1, obj2) {
    if(obj1.length == 0){
        return obj1;
    }
    if( obj2.length == 0){
        return obj2;
    }
    var result = [];
    var tmp = 0;
    for(var i = 0; i<obj1.length;i++) {
        for(var j = 0; j<obj2.length;j++) {
            if(obj1[i] == obj2[j]){
                result[tmp] = obj1[i];
            } 
        }
    }
    return result;
}


//Get Offre by titre
router.get('/nom/:_nom', function(req, res){
    var name = req.params._nom;
    console.log(name);
	Offre.getOffreByTitre(name, function(err, offre){
		if(err){
			throw err;
		}
		res.json(offre);
	});	
});


//Get Offres par array de preferences et ou par marque
router.get('/', function(req, res){
    var query = querystring.parse(req.url.split('?')[1]);
    if(query.preferences && query.marque){
        var array;
        if (!Array.isArray(query.preferences)){
            array = [query.preferences];
        }else{
            array = query.preferences;
        }

        Offre.getOffreByPreferences(array, function(errP, offresP){
            if(errP){
                throw errP;
            }
            Offre.getOffreByMarque(query.marque, function(errM, offresM){
                if(errM){
                    throw errM;
                }
                res.json(commonJSON(offresP, offreM));
            });	
        });	
    }
    else if(query.preferences){
        var array;
        if (!Array.isArray(query.preferences)){
            array = [query.preferences];
        }else{
            array = query.preferences;
        }

        Offre.getOffreByPreferences(array, function(err, offres){
            if(err){
                throw err;
            }
            res.json(offres);
        });	
    }
    else if(query.marque){
        Offre.getOffreByMarque(query.marque, function(err, offres){
            if(err){
                throw err;
            }
            res.json(offres);
        });	
    }
    
});

//Affiche toutes les offres
router.get('/offres/:limit', function(req, res){
	var limit = req.params.limit;
	Offre.getOffres(limit, function(err, offres){
		if (err) throw err;
		res.json(offres);
	});
});

module.exports = router;