

var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var querystring = require('querystring');

var UserApp = require('../models/userApp');
var ReseauSocial = require('../models/reseauSocial');

var googleMapsClient = require('@google/maps').createClient({
	key: 'AIzaSyAPsN7xhUSMDdgG8adlUfShMsvjhErgtiQ '
  });

//Réccupère n reseaux sociaux 
router.get('/:_limit', function(req, res){
    var limit = parseInt(req.params._limit);
    console.log(limit);
	ReseauSocial.getReseauxSociaux( limit, function(err, reseaux){
		if(err){
			throw err;
		}
		res.json(reseaux);
	});	
});

//Get Reseau by name
router.get('/nom/:_nom', function(req, res){
    var name = req.params._nom;
    console.log(name);
	ReseauSocial.getReseauSocialByName(name, function(err, reseau){
		if(err){
			throw err;
		}
		res.json(reseau);
	});	
});

//Get Reseaux by array of preferences
router.get('/create/', function(req, res){
    var query = querystring.parse(req.url.split('?')[1]);
    console.log(query);
    var array;
    if (!Array.isArray(query.preferences)){
        array = [query.preferences];
    }else{
        array = query.preferences;
    }
    if(query.preferences){
        ReseauSocial.getReseauSocialByPreferences(array, function(err, reseaux){
            if(err){
                throw err;
            }
            res.json(reseaux);
        });	
    }
});

//Crée un reseau social
router.post('/create/:_id', function(req, res){
	var nom = req.body.nom;
	var description = req.body.description;
	var public = req.body.public;
    var preferences = req.body.preferences.split(" ");
    var idF= req.params._id;
    UserApp.getUserById(idF,function(err, user){
        if (err) throw err;
        var idUser= user._id;


        //Creation d'une variable Reseau contenant les informations données
        var newReseau = new ReseauSocial({
            nom: nom,
            description : description,
            admin: idUser,
            public: public
        });
			
        //Ajout un par un des preférences dans la variable de Offre
        for(var i=0;i<preferences.length;i++){
            newReseau.preferences.push(preferences[i]);
        }
        ReseauSocial.createReseauSocial(newReseau, function(err, reseau){
            if(err) throw err;
            console.log("Ajout du réseau social : "+ reseau.nom);
            res.json(reseau);
        });
    
    });

});

//Post message sur le réseau
router.post('/message/:_idR/:_idU', function(req, res){
    var idUserFirebase = req.params._idU;
    var idReseau = req.params._idR;

    UserApp.getUserById(idUserFirebase, function(err, user){
        if (err) throw err;
        var idUser = user._id;

    console.log(idReseau);

    ReseauSocial.isAbonne(idUser, function(err, isAbonne){
        if (err) throw err;
        if(isAbonne){
            var titre = req.body.titre;
            var corp = req.body.corp;
            var auteur = req.body.auteur;
        
            var newMessage = {
                auteur : auteur,
                titre : titre,
                corp : corp
            };
        
            ReseauSocial.getReseauSocialById(idReseau, function(err, reseau){
                if (err) throw err;
                reseau.message.push(newMessage);
                reseau.save(function(err, reseau){
                    if (err) throw err;
                    res.json(reseau);
                });
            });
        }
    });
});
	
});


router.get('/isAdmin/:_idA/:_idR', function(req, res){
    var idUser = req.params._idA;
    var idReseau = req.params._idR;
    UserApp.getUserById(idUser, function(err, user){
        if (err) throw err;
        ReseauSocial.isAdmin(user._id, idReseau, function(err, result){
            if (err) throw err;
            res.json({res :result});
        });
    });
});

router.get('/isAbonne/:_idA/:_idR', function(req, res){
    var idUser = req.params._idA;
    var idReseau = req.params._idR;
    UserApp.getUserById(idUser, function(err, user){
        if (err) throw err;
        ReseauSocial.isAbonne(idReseau, user._id, function(err, result){
            if (err) throw err;
            res.json({res :result});
        });

    });
});


router.post('/addAbonne/RP', function(req, res){

    var idUser = req.body.idUser;
    var idReseau = req.body.idReseau;

    ReseauSocial.getReseauSocialById(idReseau, function(err, reseau){
        if (err) throw err;
        if (reseau.public){
            UserApp.getUserById(idUser, function(err, user){
                if (err) throw err;
                reseau.abonnes.push(user._id);
                reseau.save();
                res.json({re : "Ajoute au reseau public"}); 
            });
        }else{
            var idUserAdmin = req.body.idAdmin;
            UserApp.getUserById(idUserAdmin, function(err, user){
                if (err) throw err;
                ReseauSocial.isAdmin(user._id, idReseau, function(err, isAdmin){
                    if (err) throw err;
                    if (isAdmin){
                        reseau.abonnes.push(user._id);
                        reseau.save();
                        res.json({re : "Ajoute au reseau prive"});
                    }else {
                        res.json({res:"Mauvais admin"});
                    }
                });
            });
        }
    });
});


module.exports = router;



