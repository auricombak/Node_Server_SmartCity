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


// Get all Offres
module.exports.getUsers = function(callback, limit){
    Offre.find(callback).limit(limit);
}

// Get Commerce from Offre
module.exports.getCommerce = function(id, callback){
	User.findById(id)
		.populate('commerce')
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

//Get offre by ID
module.exports.getUserById = function(id,callback){
	Offre.findById(id,callback );
}

//Get offres by marque
module.exports.getUserById = function(req,callback){
	User.find()
        .populate( 'commerce', null, { marque: req } )
		.exec(function(err, offre){
			callback(err, offre.commerce);
	});
}

