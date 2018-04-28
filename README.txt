Sécurité : 

Les actions se font via les _id crées dans la base mongo 
Le passage par paramètre des ids Firebase est vérifié

+_______+
|       |
| API : | 
|_______|

__________________________________________________________

|> /api/offres/:n
| Renvoie n offres

|> /api/offres/?marque=marqueP&preferences=preference1&preferences=preference2
| Renvoie les offres par marque et ou par préferences

|> /api/offres/nom/:nom 
| Renvoie les offres par leurs nom

|> /api/offres/commerce/:_id
|   Renvoir le commerce d'une offre d'id :_id

|> /api/offres/commerces/:_id
| Renvoie toute les offres d'un commerce d'id :_id
__________________________________________________________

|> /api/commerces/:_lat/:_lng/:_n
| Renvoie les n commerces les plus proches par rapport à
| leurs positions :_lat = latitude et :_lng = longitude

|> /api/commerces/nom/:_nom
| Renvoie le commerce par son nom :_nom

|> /api/commerces/?categories=cat1&categories=cat2
| Renvoie les commerces contenant les catégories 
| entrées dans le tableau ?categories

|> /api/commerces/:_n
| Renvoie n commerces

__________________________________________________________

|>post: /api/reseauSocial/addAbonne/RP
| Ajoute un utilisateur à un réseau
{
        "idUser": "111",
        "idReseau": "5ae4a738de23f7583c0219f5",
        "idAdmin": "775" (Si reseau prive)
}

|>post: /api/reseauSocial/addAbonne/RP
| { idUserAdmin : '', idUser : '', idReseau : '' } Ajoute un utilisateur à un réseau privé

|>get: /api/reseauSocial/isAbonne/:_idA/:_idR
| Renvoie true si l'user d'id _idA est abonne au reseau d'id _idR

|>get: /api/reseauSocial/isAdmin/:_idA/:_idR
| Renvoie true si l'user d'id _idA est admin au reseau d'id _idR

|>post: /api/reseauSocial/message/:_idR/:_idU
| Verifie si l'user d'id _idU est membre du réseau d'id _idR
| si oui poste le message { titre : '', auteur : '', corp: '' }
{
     "auteur" : "Moskito32",
     "titre" : "Bienvenue",
     "corp" : "Salut tout le monde"
}


|>post: /api/reseauSocial/:_idU
| Crée un reseau social d'admin :_idU
{
	"nom" : "Les bombers",
	"description" : "Ce groupe réunit tout les fans du film bombers",
	"public" : "true",
    "preferences" : "film bombers warazazat"
}

|>get: /api/reseauSocial/?preferences=pref1&preferences=pref2
| Récupère les réseaux sociaux dont les préférences 
| sont dans l'array preferences

|>get: /api/reseauSocial/:_limit
| Récupère les n réseaux Sociaux définis par :_limit

|>get: /api/reseauSocial/nom/:_nom
| Récupère les réseaus Sociaux par noms :_nom 

__________________________________________________________

|>post: /api/userApp/
| Crée un utilisateur contenu dans req.body.idFire 
{
        "idFire" :"774"
}


|>put: /api/userApp/UI/:_id
| Met à jour userInfor d'un utilisateur identifié par :_id
| user.body ( contient UserInfo )
{
        "pseudo": "Makilaoo",
        "phone": "0745544788",
        "surname": "Salem",
        "name": "MOHRI",
        "sexe": "true",
        "date" : "29/05/1994"
}

|>put: /api/userApp/SA/:_id
| Met à jour settingActu d'un utilisateur identifié par :_id
| user.body ( contient SettingActu )
{
        "calendrierParamChecked":"false",
        "meteoParamChecked":"false",
        "actualiteParamChecked":"false",
        "alarmParamChecked":"false",
        "traficParamChecked":"false"
}


|>post: /api/userApp/Commerce
| Ajoute un commerce aux favoris d'un utilisateur 
{
"idUser":"774",
"idCommerce":"5adf4bc65351bb27fcf12655"
}

|>get: /api/userApp/Commerce/:_idU
| Renvoie les commerces favoris d'un utilisateur 
| :_idU -> id Firebase de l'utilisateur

|>post: /api/userApp/Demande
| Ajoute une demande à un utilisateur 
| Body : contient la demande {
|        idUser : idFire,
|        idResau : idReseau
|    }

|>post: /api/userApp/Demande/Valide
| Valide une demande à un utilisateur 
| Body : contient la demande {
|        idUser : idFire,
|        idResau : idReseau
|}



+_____________________________+
|                             |
| Fonctions sur les modèles : | 
|_____________________________| 

__________________________________________________________
Commerce.removeCommerce = function(id, callback);
Commerce.addAbonne = function(id,user_id,callback);
Commerce.createCommerce = function(commerce, callback);
Commerce.getCommercesByName = function(name, callback);
Commerce.getCommercesByCategories = function(req, callback);
Commerce.getCommerceById = function(id, callback);
Commerce.getCommerces = function(limit, callback);
Commerce.getCommercesByDistance = function(dist, limit, callback)
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
ReseauSocial.getReseauSociaux = function(limit, callback)
ReseauSocial.getReseauSocialById = function(id, callback)
ReseauSocial.getReseauSocialByName = function(name, callback)
ReseauSocial.createReseauSocial = function(newReseau, callback)
__________________________________________________________
Offre.getOffresByMarque = function(req,callback)
Offre.getOffreById = function(id,callback)
Offre.getOffreByPreferences = function(req, callback)
Offre.createOffre = function(newOffre, callback)
Offre.getCommerce = function(id, callback)
Offre.getOffres = function(callback, limit)
Offre.getOffreFromCommerceId = function(id, callback)
Offre.getOffreByTitre = function(titre, callback)
__________________________________________________________