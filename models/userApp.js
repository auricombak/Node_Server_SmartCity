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
module.exports.getUsers = function(id,callback){
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

