const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Get All Pokémon
router.get('/allPokemon', userController.getAllPokemon);

// Get All Pokémon LVL 1
router.get('/allPokemonLvl', userController.getAllPokemonLvl)

// CreateUser
router.post('/createUser', userController.createUserAndAddToPokedex)

// Récupérer les informations d'un pokemon
router.get('/onePokemon/:id', userController.getInfoOnePokemon)

module.exports = router;