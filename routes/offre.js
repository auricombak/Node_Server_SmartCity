



var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var querystring = require('querystring');

var User = require('../models/user');
var Commerce = require('../models/commerce');
var Offre = require('../models/offre')

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
            if(obj1[i].equals(obj2[j])){
                result[tmp] = obj1[i];
            } 
        }
    }
    return result;
}


//Récupère une offre par titre
router.get('/nom/:_nom', function(req, res){
    var name = req.params._nom;
	Offre.getOffreByTitre(name, function(err, offre){
		if(err){
			throw err;
		}
		res.json({res:offre});
	});	
});



//Get Offres par array de preferences et ou par marque
router.get('/', function(req, res){
    var query = querystring.parse(req.url.split('?')[1]);
    console.log(query);
    if(query.preferences && query.marque){
        console.log("marque & preference");
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
            Offre.getOffresByMarque(query.marque, function(errM, offresM){
                if(errM){
                    throw errM;
                }
                res.json( {res : { offresP, offresM}});
            });	
        });	
    }
    else if(query.preferences){
        console.log("preference");
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
            res.json({res:offre});
        });	
    }
    else if(query.marque){
        console.log("marque : "+query.marque);
        Offre.getOffresByMarque(query.marque, function(err, offres){
            if(err){
                throw err;
            }
            res.json({res:offre});
        });	
    }
    
});

//Recupère n offres
router.get('/:limit', function(req, res){
	var limit = req.params.limit;
	Offre.getOffres(limit, function(err, offres){
		if (err) throw err;
		res.json({res:offre});
	});
});

//Recupère les offres à partir de l'id du commercant
router.get('/commerces/:_id', function(req, res){
    var id= req.params._id;
	Offre.getOffreFromCommerceId(id, function(err, offre){
		if (err) throw err;
		res.json({res:offre});
	});
});

//Recupère le commercant
router.get('/commerce/:_id', function(req, res){
    var id= req.params._id;
	Offre.getCommerce(id, function(err, commerce){
		if (err) throw err;
		res.json({res:offre});
	});
});

module.exports = router;