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
ReseauSocial.getReseauSocialById = function(limit, callback)
ReseauSocial.getReseauSocialById = function(id, callback)
ReseauSocial.getReseauSocialByName = function(name, callback)
ReseauSocial.createReseauSocial = function(newReseau, callback)
__________________________________________________________
Offre.getOffreByMarque = function(req,callback)
Offre.getOffreById = function(id,callback)
Offre.getOffreByPreferences = function(req, callback)
Offre.createOffre = function(newOffre, callback)
Offre.getCommerce = function(id, callback)
Offre.getOffres = function(callback, limit)
Offre.getOffreFromCommerceId = function(id, callback)
Offre.getOffreByTitre = function(titre, callback)
__________________________________________________________