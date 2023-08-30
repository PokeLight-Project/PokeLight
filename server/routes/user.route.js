const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Get All Pokémon
router.get('/allPokemon', userController.getAllPokemon);

// Get All Pokémon LVL 1
router.get('/allPokemonLvl', userController.getAllPokemonLvl)

// Get All Pokedex
router.get('/allPokedex', userController.getAllPokedex)

// Supprimer un utilisateur
router.delete('/delete/:id', userController.deleteOneUserPokedex)

// CreateUser
router.post('/createUser', userController.createUserAndAddToPokedex)

// Récupérer les informations d'un pokemon
router.get('/onePokemon/:id', userController.getInfoOnePokemon)

// Inserer un user dans la table teamRed
router.post('/teamRed', userController.createTeamRed)

// Inserer un user dans la table teamFlora
router.post('/teamFlora', userController.createTeamFlora)

// Obtenir les maps
router.get('/getMap', userController.getBackGround)

// Obtenir les informations sur les utilisateurs de l'équipe Flora
router.get("/getTeamFlora", userController.getTeamFloraInfo)

// Obtenir les informations sur les utilisateurs de l'équipe Red
router.get("/getTeamRed", userController.getTeamRedInfo)

// Create Message
router.post('/createMessage', userController.createMessage)

// Get All Messages
router.get('/allMessages', userController.getAllMessages)

module.exports = router;