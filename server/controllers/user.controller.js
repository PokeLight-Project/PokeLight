const mysql = require('mysql');

// Connexion à la BDD
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

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




module.exports = {
    getAllPokemon, getAllPokemonLvl
}