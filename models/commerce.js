var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


var SchemaTypes = mongoose.Schema.Types;


//  Schema
var CommerceSchema = mongoose.Schema({
	nom: {
		type: String
    },
    marque: {
        type: String
    },
	categories: [String],
	sAbonnes: [{
        type: mongoose.Schema.ObjectId, 
        ref: 'userApp'
    }],
    position: {
        lat: {
            type: String
        },
        lng: {
            type: String
        },
        adresse: {
            type: String
        }
    },
    published:{
        type: Date,
        default:Date.now
    }
});



var Commerce = module.exports = mongoose.model('Commerce', CommerceSchema);

function radians(degrees) {
    var TAU = 2 * Math.PI;
    return degrees * TAU / 360;
}

function distance(position1,position2){
    var lat1=parseFloat(position1.lat);
    var lat2=parseFloat(position2.latitude);
    var lon1=parseFloat(position1.lng);
    var lon2=parseFloat(position2.longitude);
    var R = 6371000; // metres
    var φ1 = radians(lat1);
    var φ2 = radians(lat2);
    var Δφ = radians(lat2-lat1);
    var Δλ = radians(lon2-lon1);

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;
    return d;
}

// Get array of the n nearest commerces from a position. 
module.exports.getCommercesByDistances = function(position, limit, callback){
    Commerce.find(function(err, commerces){
        try{
            var result = [];
            for(var j=0;j<limit;j++){
                var closest=commerces[0];
                var closest_distance=distance(closest.position,position);
                for(var i=1;i<commerces.length;i++){
                    if(distance(closest.position,position)<closest_distance){
                        closest_distance=distance(commerces[i].position,position);
                        closest=commerces[i];
                    }
                }
                result[j] = closest;
                j++;
            }
            callback(err, result);
        }catch(err){ callback(err, commerces); }
    });
    
}

// Get all Commerce
module.exports.getCommerces = function(callback, limit){
    Commerce.find(callback).limit(limit);
}

// Get Commerce by Id
module.exports.getCommerceById = function(id, callback){
    Commerce.findById(id, callback);
}

// Get Commerce by ville
module.exports.getCommerceByVille = function(vil, callback){
    var query = { position : { ville : vil }};
    Commerce.find(query, callback);
}

// Get Commerce by quartier
module.exports.getCommerceByQuartier = function(qua, callback){
    var query = { position : { quartier : qua }};
    Commerce.find(query, callback);
}

// Get Commerce by departement
module.exports.getCommerceByDepartement = function(dep, callback){
    var query = { position : { departement : dep }};
    Commerce.find(query, callback);
}

// Add Commerce
module.exports.createCommerce = function(commerce, callback){
    commerce.save(commerce, callback);
}

// Ajoute un utilisateur 
//Si ça merche pas ajouter user._id
module.exports.addAbonne = function(id,user,callback){
    Commerce.findById(id, callback).sAbonnes.push(user);
}

// Delete Commerce
module.exports.removeCommerce = function(id, callback){
    var query = {_id:id};
    Commerce.remove(query, callback);
}