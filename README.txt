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

|>post: /api/reseauSocial/addAbonne
| { idUser : '', idReseau : '' } Ajoute un utilisateur à un réseau

|>post: /api/reseauSocial/addAbonne/RP
| { idUserAdmin : '', idUser : '', idReseau : '' } Ajoute un utilisateur à un réseau privé

|>get: /api/reseauSocial/isAbonne/:_idA/:_idR
| Renvoie true si l'user d'id _idA est abonne au reseau d'id _idR

|>get: /api/reseauSocial/isAdmin/:_idA/:_idR
| Renvoie true si l'user d'id _idA est admin au reseau d'id _idR

|>post: /api/reseauSocial/message/:_idR/:_idU
| Verifie si l'user d'id _idU est membre du réseau d'id _idR
| si oui poste le message { titre : '', auteur : '', corp: '' }

|>post: /api/reseauSocial/:_idU
| Crée un reseau social d'admin :_idU
| {nom : String, description : String, public : Boolean  }

|>get: /api/reseauSocial/?preferences=preference1&preferences=preference2
| Récupère les réseaux sociaux dont les préférences 
| sont dans l'array preferences

|>get: /api/reseauSocial/:_limit
| Récupère les n réseaux Sociaux définis par :_limit

|>get: /api/reseauSocial/nom/:_nom
| Récupère les réseaus Sociaux par noms :_nom 


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