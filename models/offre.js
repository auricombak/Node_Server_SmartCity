var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


var SchemaTypes = mongoose.Schema.Types;


var OffreSchema = mongoose.Schema({
    titre: {
        type : String
    },
    preferences :[String],
    description :{
        type : String
    },
    commerce: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Commerce'
    },
    published:{
        type: Date,
        default:Date.now
    }
});

var Offre = module.exports = mongoose.model('Offre', OffreSchema);


// Get n Offres
module.exports.getOffres = function(limit, callback){
    var limite = parseInt(limit);
    Offre.find()
    .limit(limite)
    .exec(callback);
}

// Get Commerce from Offre
module.exports.getCommerce = function(id, callback){
	User.findById(id)
		.populate('Commerce')
		.exec(function(err, offre){
			callback(err, offre.commerces);
	});
}

//Create Offre
module.exports.createOffre = function(newOffre, callback){
    newOffre.save(callback);
} 

// Get Offres by preferences
module.exports.getOffreByPreferences = function(req, callback){
    Offre.find({preferences : {$in : req}},callback);      
}

// Get Offres by Name
module.exports.getOffreByTitre = function(req, callback){
    Offre.find({titre : req},callback);      
}

//Get offre by ID
module.exports.getOffreById = function(id,callback){
	Offre.findById(id,callback );
}

//Get offres by marque
module.exports.getOffreByMarque = function(req,callback){
	Offre.find()
        .populate( 'Commerce', null, { marque: req } )
		.exec(function(err, offre){
			callback(err, offre.commerce);
	});
}

// Get Offre from CommerceID
module.exports.getOffreFromCommerceId = function(id, callback){
	Offre.find()
		.populate('Commerce', null, { _id: id })
		.exec(function(err, offre){
			callback(err, offre);
	});
}
