var mongoose = require('mongoose');

// User Schema
var ReseauSocialSchema = mongoose.Schema({
    nom: {
        type: String,
        index:true
    },
    description: {
        type: String
	},
    messages: [{
        auteur : {
            type: String 
        },
        titre : {
            type: String 
        },
        corp : {
            type: String 
        }, 
        published:{
            type: Date,
            default:Date.now
        } 
    }],
    preferences : [String],
    published:{
        type: Date,
        default:Date.now
    },
    public:{
        type: Boolean
    },
    abonnes :[{type: Schema.ObjectId, ref: 'UserApp'}],
    admin :{type: Schema.ObjectId, ref: 'UserApp'}
});

var ReseauSocial = module.exports = mongoose.model('ReseauSocial', UserAppSchema);

//Create ReseauSocial 
module.exports.createReseauSocial = function(newReseau, callback){
	newReseau.save(callback);
}

//Get ReseauSocial by nom
module.exports.getReseauSocialByName = function(name, callback){
	var query = {nom: name};
	ReseauSocial.findOne(query, callback);
}


//Get ReseauSocial by id
module.exports.getReseauSocialById = function(id, callback){
	ReseauSocial.findById(id, callback);
}

//Get ReseauSociaux
module.exports.getReseauSocialById = function(limit, callback){
    ReseauSocial.find()
    .limit(limit)
    .exec(callback);
}

//Get reseauxSociaux who i am Admin
module.exports.getReseauxSociauxAdmin = function(id,callback){
    var query = {admin: id};
	ReseauSocial.find(query, callback);
}

//Get reseauxSociaux where i subbscribed
module.exports.getReseauxSociauxAbonne = function(id,callback){
    var query = {abonnes:{$in : id}};
	ReseauSocial.find(query, callback);
}

//Get admin
module.exports.getAdmin = function(id, callback){
    ReseauSocial.findById(id)
    .populate('UserApp')
    .exec(function(err, res){
        callback(err, res.admin);
    });
}

//Get list of abonne
module.exports.getAbonnes = function(id, callback){
    ReseauSocial.findById(id)
    .populate('UserApp')
    .exec(function(err, res){
        callback(err, res.abonnes);
    });
}

