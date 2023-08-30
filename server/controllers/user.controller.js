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

const createTeamRed = async (req, res) => {
    const { id_user } = req.body;
    console.log(id_user)
    if (!id_user) {
        return res.status(400).json({
            error: 'Données incorrectes'
        });
    }

    try {
        const queryInsertTeamRed = 'INSERT INTO `teamred` (`id_user`) VALUES (?)';
        await conn.query(queryInsertTeamRed, [id_user]);
        res.status(200).json({ message: 'Utilisateur enregistré dans la team RED' })
    } catch (error) {
        console.error('Erreur lors de la requête', error);
        res.status(500).json({ error: 'Erreur lors de la requête' });
    }
}

const createTeamFlora = async (req, res) => {
    const { id_user } = req.body;

    if (!id_user) {
        return res.status(400).json({
            error: 'Données incorrectes'
        });
    }

    try {
        const queryInsertTeamFlora = 'INSERT INTO `teamflora` (`id_user`) VALUES (?)';
        await conn.query(queryInsertTeamFlora, [id_user]);

        res.status(200).json({ message: 'Utilisateur enregistré dans la team Flora' })
    } catch (error) {
        console.error('Erreur lors de la requête', error);
        res.status(500).json({ error: 'Erreur lors de la requête' });
    }
}

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

const getInfoOnePokemon = (req, res) => {
    const pokemonId = req.params.id;
    const query = `SELECT pv_pokemon, pa_pokemon, type_pokemon, image_url_pokemon FROM pokemon WHERE id_pokemon = ${pokemonId}`;
    conn.query(query, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des données :" + err);
            res.status(500).json({ error: "Erreur lors de la récupération des données" })
        } else {
            res.status(200).json(result)
        }
    })
}

const getBackGround = (req, res) => {
    const query = 'SELECT * FROM `arena`';
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
    const query = `SELECT user.username_user, pokemon.image_url_pokemon, user.level , pokemon.type_pokemon, pokemon.id_pokemon, user.id_user
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

// Obtenez les informations sur les utilisateurs dans l'équipe "Red"
const getTeamRedInfo = async (req, res) => {
    const query = `
        SELECT user.username_user, user.level,
         pokemon.image_url_pokemon, pokemon.id_pokemon,
          pokemon.pv_pokemon, pokemon.pa_pokemon,
           pokemon.name_pokemon, pokemon.type_pokemon,
            pokemon.required_level
             FROM teamred
              JOIN user ON teamred.id_user = user.id_user
               JOIN pokedex ON user.id_user = pokedex.id_user
                JOIN pokemon ON pokedex.id_pokemon = pokemon.id_pokemon;
        `;
    conn.query(query, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des données :" + err);
            res.status(500).json({ error: "Erreur lors de la récupération des données" })
        } else {
            res.status(200).json(result)
        }
    });
};

// Obtenez les informations sur les utilisateurs dans l'équipe "Red"
const getTeamRedInfo = async (req, res) => {
    const query = `
        SELECT user.username_user, user.level,
         pokemon.image_url_pokemon, pokemon.id_pokemon,
          pokemon.pv_pokemon, pokemon.pa_pokemon,
           pokemon.name_pokemon, pokemon.type_pokemon,
            pokemon.required_level
             FROM teamred
              JOIN user ON teamred.id_user = user.id_user
               JOIN pokedex ON user.id_user = pokedex.id_user
                JOIN pokemon ON pokedex.id_pokemon = pokemon.id_pokemon;
        `;
    conn.query(query, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des données :" + err);
            res.status(500).json({ error: "Erreur lors de la récupération des données" })
        } else {
            res.status(200).json(result)
        }
    });
};

// Obtenez les informations sur les utilisateurs dans l'équipe "Red"
const getTeamRedInfo = async (req, res) => {
    const query = `
        SELECT user.username_user, user.level,
         pokemon.image_url_pokemon, pokemon.id_pokemon,
          pokemon.pv_pokemon, pokemon.pa_pokemon,
           pokemon.name_pokemon, pokemon.type_pokemon,
            pokemon.required_level
             FROM teamred
              JOIN user ON teamred.id_user = user.id_user
               JOIN pokedex ON user.id_user = pokedex.id_user
                JOIN pokemon ON pokedex.id_pokemon = pokemon.id_pokemon;
        `;
    conn.query(query, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des données :" + err);
            res.status(500).json({ error: "Erreur lors de la récupération des données" })
        } else {
            res.status(200).json(result)
        }
    });
};

// Créer un nouveau message
const createMessage = async (req, res) => {
    const { content_message } = req.body;

    if (!content_message) {
        return res.status(400).json({
            error: 'Contenu du message manquant'
        });
    }

    try {
        const createMessageQuery = 'INSERT INTO `message` (`content_message`) VALUES (?)';
        await conn.query(createMessageQuery, [content_message]);

        res.status(200).json({ message: 'Message enregistré avec succès' });
    } catch (error) {
        console.error('Erreur lors de la requête', error);
        res.status(500).json({ error: 'Erreur lors de la requête' });
    }
};

// Récupérer tous les messages
const getAllMessages = (req, res) => {
    const query = 'SELECT * FROM message';
    conn.query(query, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des données :", err);
            res.status(500).json({ error: "Erreur lors de la récupération des données" })
        } else {
            res.status(200).json(result)
        }
    })
}
// DeleteOneUserPokedex
const deleteOneUserPokedex = (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({
            error: 'ID de l\'utilisateur manquant dans les paramètres de la route',
        })
    }
    // Construction de la requête SQL pour supprimer l'utilisateur
    let query = `DELETE FROM pokedex WHERE id_user = ${userId}`

    conn.query(query, (err) => {
        if (err) {
            console.error('Erreur lors de la suppression de l\'utilisateur');
            res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
        } else {
            res.status(200).json({ message: 'Utilisateur supprimer' });
        }
    });
}



// Obtenez les informations sur les utilisateurs dans l'équipe "Flora"
const getTeamFloraInfo = async (req, res) => {
    const query = `
    SELECT user.username_user, user.level,
     pokemon.image_url_pokemon, pokemon.id_pokemon,
      pokemon.pv_pokemon, pokemon.pa_pokemon,
       pokemon.name_pokemon, pokemon.type_pokemon,
        pokemon.required_level
         FROM teamflora
          JOIN user ON teamflora.id_user = user.id_user
           JOIN pokedex ON user.id_user = pokedex.id_user
            JOIN pokemon ON pokedex.id_pokemon = pokemon.id_pokemon;
    `;
    conn.query(query, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des données :" + err);
            res.status(500).json({ error: "Erreur lors de la récupération des données" })
        } else {
            res.status(200).json(result)
        }
    });
};


module.exports = {
    getAllPokemon,
    getAllPokemonLvl,
    getAllPokedex,
    createUserAndAddToPokedex,
    getInfoOnePokemon,
    deleteOneUserPokedex,
    createTeamRed,
    createTeamFlora,
    getBackGround,
    getTeamFloraInfo,
    getTeamRedInfo,
    createMessage, getAllMessages, deleteOneUserPokedex
}