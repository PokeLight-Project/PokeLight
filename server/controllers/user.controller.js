const mysql = require('mysql');

// Connexion à la BDD
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

// Créer un nouvel utilisateur et lier à un Pokémon dans la table "pokedex"
const createUserAndAddToPokedex = async (req, res) => {
    const { username_user, id_pokemon } = req.body;

    if (!username_user || !id_pokemon) {
        return res.status(400).json({
            error: 'Données incorrectes'
        });
    }

    try {
        // Créer l'utilisateur et récupérer son ID
        const createUserQuery = 'INSERT INTO `user` (`username_user`, `level`) VALUES (?, 1)';
        const createUserResult = await conn.query(createUserQuery, [username_user]);

        // Récupérer l'ID de l'utilisateur inséré
        const userId = createUserResult.insertId;

        // Créer une entrée dans la table "pokedex" pour lier l'utilisateur et le Pokémon
        const addToPokedexQuery = 'INSERT INTO `pokedex` (`id_user`, `id_pokemon`) VALUES (?, ?)';
        await conn.query(addToPokedexQuery, [userId, id_pokemon]);

        res.status(200).json({ message: 'Utilisateur enregistré et lié au Pokémon' });
    } catch (error) {
        console.error('Erreur lors de la requête', error);
        res.status(500).json({ error: 'Erreur lors de la requête' });
    }
};

// getAllPokemon
const getAllPokemon = (req, res) => {
    const query = 'SELECT * FROM pokemon';
    conn.query(query, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des données :" + err);
            res.status(500).json({ error: "Erreur lors de la récupération des données" })
        } else {
            res.status(200).json(result)
        }
    })
}

// getAllPokemonLv1
const getAllPokemonLvl = (req, res) => {
    const query = `SELECT *
    FROM pokemon
    WHERE required_level = 1
    AND image_url_pokemon LIKE '%.gif'`;
    conn.query(query, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des données :" + err);
            res.status(500).json({ error: "Erreur lors de la récupération des données" })
        } else {
            res.status(200).json(result)
        }
    })
}

// getAllPokedex
const getAllPokedex = (req, res) => {
    const query = `SELECT user.username_user, pokemon.image_url_pokemon, user.level , pokemon.type_pokemon
    FROM pokedex
    JOIN user user ON pokedex.id_user = user.id_user
    JOIN pokemon ON pokedex.id_pokemon = pokemon.id_pokemon;`;
    conn.query(query, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des données :" + err);
            res.status(500).json({ error: "Erreur lors de la récupération des données" })
        } else {
            res.status(200).json(result)
        }
    })
}



module.exports = {
    getAllPokemon, getAllPokemonLvl, getAllPokedex, createUserAndAddToPokedex
}