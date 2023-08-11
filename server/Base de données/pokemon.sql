-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 11 août 2023 à 14:16
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `pokelight`
--

-- --------------------------------------------------------

--
-- Structure de la table `pokemon`
--

DROP TABLE IF EXISTS `pokemon`;
CREATE TABLE IF NOT EXISTS `pokemon` (
  `id_pokemon` int NOT NULL AUTO_INCREMENT,
  `name_pokemon` varchar(255) DEFAULT NULL,
  `image_url_pokemon` varchar(255) DEFAULT NULL,
  `pv_pokemon` int DEFAULT NULL,
  `pa_pokemon` int DEFAULT NULL,
  `required_level` int DEFAULT NULL,
  `type_pokemon` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_pokemon`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `pokemon`
--

INSERT INTO `pokemon` (`id_pokemon`, `name_pokemon`, `image_url_pokemon`, `pv_pokemon`, `pa_pokemon`, `required_level`, `type_pokemon`) VALUES
(2, 'bulbizarre', 'https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif', 100, 15, 1, 'plante'),
(3, 'herbizarre', 'https://img.pokemondb.net/sprites/black-white/anim/normal/ivysaur.gif', 114, 18, 5, 'plante'),
(4, 'bulbizarrePng', 'https://img.pokemondb.net/sprites/platinum/normal/bulbasaur.png', 100, 15, 1, 'plante'),
(5, 'herbizarrePng', 'https://img.pokemondb.net/sprites/platinum/normal/ivysaur.png', 114, 18, 5, 'plante'),
(6, 'florizarre', 'https://img.pokemondb.net/sprites/black-white/anim/normal/venusaur-f.gif', 149, 27, 10, 'plante'),
(7, 'florizarrePng', 'https://img.pokemondb.net/sprites/platinum/normal/venusaur-f.png', 149, 27, 10, 'plante'),
(8, 'salameche', 'https://img.pokemondb.net/sprites/black-white/anim/normal/charmander.gif', 100, 15, 1, 'feu'),
(9, 'salamechePng', 'https://img.pokemondb.net/sprites/platinum/normal/charmander.png', 100, 15, 1, 'feu'),
(10, 'reptincel', 'https://img.pokemondb.net/sprites/black-white/anim/normal/charmeleon.gif', 114, 18, 5, 'feu'),
(11, 'reptincelPng', 'https://img.pokemondb.net/sprites/platinum/normal/charmeleon.png', 114, 18, 5, 'feu'),
(12, 'dracaufeu', 'https://img.pokemondb.net/sprites/black-white/anim/normal/charizard.gif', 149, 27, 10, 'feu'),
(13, 'dracaufeuPng', 'https://img.pokemondb.net/sprites/platinum/normal/charizard.png', 149, 27, 10, 'feu'),
(14, 'carapuce', 'https://img.pokemondb.net/sprites/black-white/anim/normal/squirtle.gif', 100, 15, 1, 'eau'),
(15, 'carapucePng', 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/squirtle.png', 100, 15, 1, 'eau'),
(16, 'carabaffe', 'https://img.pokemondb.net/sprites/black-white/anim/normal/wartortle.gif', 114, 18, 5, 'eau'),
(17, 'carabaffePng', 'https://img.pokemondb.net/sprites/platinum/normal/wartortle.png', 114, 18, 5, 'eau'),
(18, 'tortank', 'https://img.pokemondb.net/sprites/black-white/anim/normal/blastoise.gif', 149, 27, 10, 'eau'),
(19, 'tortankPng', 'https://img.pokemondb.net/sprites/platinum/normal/blastoise.png', 149, 27, 10, 'eau'),
(20, 'germignon', 'https://img.pokemondb.net/sprites/black-white/anim/normal/chikorita.gif', 100, 15, 1, 'plante'),
(21, 'germignonPng', 'https://img.pokemondb.net/sprites/platinum/normal/chikorita.png', 100, 15, 1, 'plante'),
(22, 'macronium', 'https://img.pokemondb.net/sprites/black-white/anim/normal/bayleef.gif', 114, 18, 5, 'plante'),
(23, 'macroniumPng', 'https://img.pokemondb.net/sprites/platinum/normal/bayleef.png', 114, 18, 5, 'plante'),
(24, 'meganium', 'https://img.pokemondb.net/sprites/black-white/anim/normal/meganium.gif', 149, 27, 10, 'plante'),
(25, 'meganiumPng', 'https://img.pokemondb.net/sprites/platinum/normal/meganium-f.png', 149, 27, 10, 'plante'),
(26, 'hericendre', 'https://img.pokemondb.net/sprites/black-white/anim/normal/cyndaquil.gif', 100, 15, 1, 'feu'),
(27, 'hericendrePng', 'https://img.pokemondb.net/sprites/platinum/normal/cyndaquil.png', 100, 15, 1, 'feu'),
(30, 'feurisson', 'https://img.pokemondb.net/sprites/black-white/anim/normal/quilava.gif', 114, 18, 5, 'feu'),
(31, 'feurissonPng', 'https://img.pokemondb.net/sprites/platinum/normal/quilava.png', 114, 18, 5, 'feu'),
(32, 'typhlosion', 'https://img.pokemondb.net/sprites/black-white/anim/normal/typhlosion.gif', 149, 27, 10, 'feu'),
(33, 'typhlosion', 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/typhlosion.png', 149, 27, 10, 'feu'),
(34, 'kaiminus', 'https://img.pokemondb.net/sprites/black-white/anim/normal/totodile.gif', 100, 15, 1, 'eau'),
(35, 'kaiminusPng', 'https://img.pokemondb.net/sprites/platinum/normal/totodile.png', 100, 15, 1, 'eau'),
(36, 'crocodil', 'https://img.pokemondb.net/sprites/black-white/anim/normal/croconaw.gif', 114, 18, 5, 'eau'),
(37, 'crocodilPng', 'https://img.pokemondb.net/sprites/platinum/normal/croconaw.png', 114, 18, 5, 'eau'),
(38, 'aligatueur', 'https://img.pokemondb.net/sprites/black-white/anim/normal/feraligatr.gif', 149, 27, 10, 'eau'),
(39, 'aligatueurPng', 'https://img.pokemondb.net/sprites/platinum/normal/feraligatr.png', 149, 27, 10, 'eau'),
(40, 'arcko', 'https://img.pokemondb.net/sprites/black-white/anim/normal/treecko.gif', 100, 15, 1, 'plante'),
(41, 'arckoPng', 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/treecko.png', 100, 15, 1, 'plante'),
(42, 'massko', 'https://img.pokemondb.net/sprites/black-white/anim/normal/grovyle.gif', 114, 18, 5, 'plante'),
(43, 'masskoPng', 'https://img.pokemondb.net/sprites/platinum/normal/grovyle.png', 114, 18, 5, 'plante'),
(44, 'jungko', 'https://img.pokemondb.net/sprites/black-white/anim/normal/sceptile.gif', 149, 27, 10, 'plante'),
(45, 'jungkoPng', 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/sceptile.png', 149, 27, 10, 'plante'),
(46, 'poussifeu', 'https://img.pokemondb.net/sprites/black-white/anim/normal/torchic-f.gif', 100, 15, 1, 'feu'),
(47, 'poussifeuPng', 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/torchic.png', 100, 15, 1, 'feu'),
(48, 'galifeu', 'https://img.pokemondb.net/sprites/black-white/anim/normal/combusken-f.gif', 114, 18, 5, 'feu'),
(49, 'galifeuPng', 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/combusken-f.png', 114, 18, 5, 'feu'),
(50, 'brasegali', 'https://img.pokemondb.net/sprites/black-white/anim/normal/blaziken.gif', 149, 27, 10, 'feu'),
(51, 'brasegaliPng', 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/blaziken-f.png', 149, 27, 10, 'feu'),
(52, 'gobou', 'https://img.pokemondb.net/sprites/black-white/anim/normal/mudkip.gif', 100, 15, 1, 'eau'),
(53, 'gobouPng', 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/mudkip.png', 100, 15, 1, 'eau'),
(54, 'flobio', 'https://img.pokemondb.net/sprites/black-white/anim/normal/marshtomp.gif', 114, 18, 5, 'eau'),
(55, 'flobioPng', 'https://img.pokemondb.net/sprites/emerald/normal/marshtomp.png', 114, 18, 5, 'eau'),
(56, 'laggron', 'https://img.pokemondb.net/sprites/black-white/anim/normal/swampert.gif', 149, 27, 10, 'eau'),
(57, 'laggronPng', 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/swampert.png', 149, 27, 10, 'eau'),
(58, 'machoc', 'https://img.pokemondb.net/sprites/black-white/anim/normal/machop.gif', 120, 16, 1, 'combat'),
(59, 'machocPng', 'https://img.pokemondb.net/sprites/diamond-pearl/normal/machop.png', 120, 16, 1, 'combat'),
(60, 'machopeur', 'https://img.pokemondb.net/sprites/black-white/anim/normal/machoke.gif', 145, 20, 5, 'combat'),
(61, 'machopeurPng', 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/machoke.png', 145, 20, 5, 'combat'),
(62, 'mackogneurPng', 'https://img.pokemondb.net/sprites/black-white/anim/normal/machamp.gif', 189, 30, 10, 'combat'),
(63, 'mackogneurPng', 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/machamp.png', 189, 30, 10, 'combat');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
