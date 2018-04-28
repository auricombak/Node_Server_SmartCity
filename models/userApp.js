var mongoose = require('mongoose');

// User Schema
var UserAppSchema = mongoose.Schema({
    idFire: {
        type: String
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
    commerces :[{type: mongoose.Schema.ObjectId, ref: 'Commerce'}],
    demandes :[
        {
            idUser : {
                type : String
            },
            idReseau : {
                type : String
            }
        }
    ]
});

var UserApp = module.exports = mongoose.model('UserApp', UserAppSchema);

//Create UserApp 
module.exports.createUser = function(newUser, callback){
	newUser.save(callback);
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
        .populate( 'commerces')
		.exec(function(err, user){
			callback(err, user.commerces);
	});
}


//Update infoUser
module.exports.updateUser = function(id, infos, callback){
    var query = {idFire:id};
    UserApp.findOne(query, function(err, user){
        user.infoUser = infos;
        user.save(callback);
    });
}

//Update settingActualite
module.exports.updateActu = function(id, setting, callback){
    var query = {idFire:id};
    UserApp.findOne(query, function(err, user){
        user.settingActualite = setting;
        user.save(callback);
    });
}

