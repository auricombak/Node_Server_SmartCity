var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');



// User Schema
var UserAppSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        index:true
	},
    password: {
        type: String, 
        required: true
	},
    infoUser:{
        pseudo:{
            type: String, 
            required: false        
        },
        phone: {
            type: Number, 
            required: false
        },
        surname: {
            type: String, 
            required: false
        },
        name: {
            type: String, 
            required: false
        },
        birth: {
            type: Date, 
            default: Date.now, 
            required: false
        },
        sexe: {
            type: Boolean, 
            required: false
        }
    },
    preferences : [String],
    settingActualite :{
        calendrierParamChecked :{
            type: Boolean,
            required: false
        },
        meteoParamChecked :{
            type: Boolean,
            required: false
        },
        actualiteParamChecked :{
            type: Boolean,
            required: false
        },
        alarmParamChecked :{
            type: Boolean,
            required: false
        },       
        traficParamChecked :{
            type: Boolean,
            required: false
        }
    },
    reseauSociaux :[{type: Schema.ObjectId, ref: 'ReseauSocialSchema'}],
    reseauSociauxAdmin :[{type: Schema.ObjectId, ref: 'ReseauSocialSchema'}],
    commerces :[{type: Schema.ObjectId, ref: 'CommerceSchema'}],
    notifications :[{type: String}]
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}