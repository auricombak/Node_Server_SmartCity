var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
	commerces: [{
			type : mongoose.Schema.Types.ObjectId,
			ref : 'Commerce'
	}]
});

var User = module.exports = mongoose.model('User', UserSchema);



// Get all Users
module.exports.getUsers = function(callback, limit){
    User.find(callback).limit(limit);
}

// Get all Commerces from User
module.exports.getCommerces = function(id, callback){
	User.findById(id)
		.populate('commerces')
		.exec(function(err, user){
			callback(err, user.commerces);
		});
}

//Create User
module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
} 

//GET User by Pseudo
module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

//GET User by ID
module.exports.getUserById = function(id,callback){
	User.findById(id,callback );
}

//Compare les mots de passe de manière cryptée
module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}


