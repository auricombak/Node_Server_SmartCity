var mongoose = require('mongoose');

// User Schema
var UserAppSchema = mongoose.Schema({
    idFire: {
        type: String,
        index:true
	},
    notifications: [String],
    infoUser:{
        pseudo:{
            type: String       
        },
        phone: {
            type: Number 
        },
        surname: {
            type: String
        },
        name: {
            type: String
        },
        birth: {
            type: Date, 
            default: Date.now, 
            required: false
        },
        sexe: {
            type: Boolean
        }
    },
    preferences : [String],
    settingActualite :{
        calendrierParamChecked :{
            type: Boolean
        },
        meteoParamChecked :{
            type: Boolean
        },
        actualiteParamChecked :{
            type: Boolean
        },
        alarmParamChecked :{
            type: Boolean
        },       
        traficParamChecked :{
            type: Boolean
        }
    },
    commerces :[{type: Schema.ObjectId, ref: 'Commerce'}]
});

var UserApp = module.exports = mongoose.model('UserApp', UserAppSchema);

//Create UserApp 
module.exports.createUser = function(newUser, callback){
	newUser.save(callback);
}

//Get UserApp by email
module.exports.getUserByEmail = function(email, callback){
	var query = {email: email};
	UserApp.findOne(query, callback);
}

//Get UserById
module.exports.getUserById = function(id, callback){
    var query = {idFire:id};
	UserApp.findOne(query, callback);
}

//Get Commerces
module.exports.getCommerces = function(id,callback){
    var query = {idFire:id};
	UserApp.findOne(query)
        .populate( 'Commerce')
		.exec(function(err, user){
			callback(err, user.commerces);
	});
}

//Update settingActualite
module.exports.updateUser = function(id, info, callback){
    var query = {idFire:id};
    var update ={
        infoUser: info
    }
    UserApp.findOneAndUpdate(query, update, callback);
}

//Update infoUser
module.exports.updateUser = function(id, setting, callback){
    var query = {idFire:id};
    var update ={
        settingActualite: setting
    }
    UserApp.findOneAndUpdate(query, update, callback);
}

/*
__________________________________________________________
Commerce.removeCommerce = function(id, callback);
Commerce.addAbonne = function(id,user_id,callback);
Commerce.createCommerce = function(commerce, callback);
Commerce.getCommerceByName = function(name, callback);
Commerce.getCommercesByCategories = function(req, callback);
Commerce.getCommerceById = function(id, callback);
Commerce.getCommerces = function(limit, callback);
Commerce.getCommerces = function(limit, callback);
__________________________________________________________
User.getUsers = function(callback, limit);
User.getCommerces = function(id, callback);
User.createUser = function(newUser, callback);
User.getUserByUsername = function(username, callback);
User.getUserById = function(id,callback);
User.comparePassword = function(candidatePassword, hash, callback);
__________________________________________________________
UserApp.getUserByEmail = function(email, callback)
UserApp.createUser = function(newUser, callback)
UserApp.getUserById = function(id, callback)
UserApp.getCommerces = function(id,callback)
UserApp.updateUser = function(id, info, callback)
UserApp.updateUser = function(id, setting, callback)
__________________________________________________________
ReseauSocial.getAdmin = function(id, callback)
ReseauSocial.getAbonnes = function(id, callback)
ReseauSocial.getReseauxSociauxAbonne = function(id,callback)
ReseauSocial.getReseauxSociauxAdmin = function(id,callback)
ReseauSocial.getReseauSocialById = function(limit, callback)
ReseauSocial.getReseauSocialById = function(id, callback)
ReseauSocial.getReseauSocialByName = function(name, callback)
ReseauSocial.createReseauSocial = function(newReseau, callback)
__________________________________________________________
Offre.getUserById = function(req,callback)
Offre.getUserById = function(id,callback)
Offre.getOffreByPreferences = function(req, callback)
Offre.createOffre = function(newOffre, callback)
Offre.getCommerce = function(id, callback)
Offre.getUsers = function(callback, limit)

*/