

var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var querystring = require('querystring');

var UserApp = require('../models/userApp');
var ReseauSocial = require('../models/reseauSocial');
var Commerce = require('../models/commerce');

var googleMapsClient = require('@google/maps').createClient({
	key: 'AIzaSyAPsN7xhUSMDdgG8adlUfShMsvjhErgtiQ '
  });


//Creation d'un UserApp  
router.post('/', function(req, res){
    var idUser = req.body.idFire;
    console.log(req.body);

	//Creation d'une variable User contenant l'id de Firebase
	var newUser = new UserApp({
        idFire : idUser,
        infoUser : {
            pseudo: "pseudo",
            phone: "0000000000",
            surname: "surname",
            name: "name",
            sexe: "true"
        },
        settingActualite : {
            calendrierParamChecked : "true",
            meteoParamChecked:"true",
            actualiteParamChecked:"true",
            alarmParamChecked:"true",
            traficParamChecked:"true"
        }
    });
			
	UserApp.createUser(newUser, function(err, user){
		if(err) throw err;
		res.json({res :upser});
	});

});

//Set userInfo  
router.put('/UI/:_id', function(req, res){
	var idFire = req.params._id;
    var infos = {
        pseudo: req.body.pseudo,
        phone: req.body.phone,
        surname: req.body.surname,
        name: req.body.name,
        sexe: req.body.sexe,
        date : req.body.date
    };

    UserApp.updateUser(idFire, infos, function(err, upser){
        if(err) throw err;
        res.json({res :upser});
    });
});



//Set settingActualité  
router.put('/SA/:_id', function(req, res){
	var idFire = req.params._id;
    var settings = {
        calendrierParamChecked: req.body.calendrierParamChecked,
        meteoParamChecked: req.body.meteoParamChecked,
        actualiteParamChecked: req.body.actualiteParamChecked,
        alarmParamChecked: req.body.alarmParamChecked,
        traficParamChecked: req.body.traficParamChecked
    };
    UserApp.updateActu(idFire, settings, function(err,  upser){
        if (err) throw err;
        res.json({res :upser});
    });

});



//Ajoute un commerces aux favoris
router.post('/Commerce', function(req, res){
    var idFire = req.body.idUser;
    var idCommerce = req.body.idCommerce;
    UserApp.getUserById(idFire, function(err,user){
        user.commerces.push(idCommerce);
        user.save(function(err, upser){
            if(err) throw err;
            res.json({res :upser});
        });
    });
});

//Get commerces  
router.get('/Commerce/:_idU', function(req, res){
    var idFire = req.params._idU;
    UserApp.getCommerces(idFire, function(err,commerces){
        if(err) throw err;
        res.json({res :commerces});
    });
});

//put demande
router.post('/Demande', function(req, res){
    var idFire = req.body.idUser;
    var idReseau = req.body.idReseau;
    var demande = req.body;
    ReseauSocial.getAdmin(idResau, function(err,admin){
        if(err) throw err;
        admin.demandes.push(demande);
        admin.save(function(err, adminSaved){
            res.json(adminSaved.demandes)
        });
    });
});

//Accept demande
router.post('/Demande/Valide', function(req, res){
    var idFire = req.body.idUser;
    var idReseau = req.body.idResau;
    ReseauSocial.getReseauSocialById(idReseau, function(err, reseau){
        reseau.push(idFire);
        reseau.save();
    });
    ReseauSocial.getAdmin(idReseau, function(err, admin){
        if (err) throw err;
        admin.pull(req.body);
        admin.save();
    });
});

module.exports = router;

