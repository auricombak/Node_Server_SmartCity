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
	Offre.findById(id)
		.populate('commerce')
		.exec(function(err, offre){
			callback(err, offre.commerce);
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
module.exports.getOffresByMarque = function(req,callback){
    var marque = req;
    var resultat = [];
	Offre.find()
    .populate('commerce') 
    .exec(function(err, offres){
        if(err) return err;
        var cmp= 0;
        for(var i= 0; i<offres.length; i++){
            if( offres[i].commerce.marque == marque){
                resultat[cmp]= offres[i];
                cmp++;
            }
        }
        callback(err, resultat);
    });
    

}

// Get Offres from CommerceID
module.exports.getOffreFromCommerceId = function(id, callback){
	Offre.find()
		.populate('commerce', null, { _id: id })
		.exec(callback);
}
