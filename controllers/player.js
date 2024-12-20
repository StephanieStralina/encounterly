const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Middleware to protect selected routes
const ensureSignedIn = require('../middleware/ensure-signed-in');

// All routes start with '/players'

//GET /players (index functionality)
router.get('/', (req, res) => {
    const players = req.user.players
    res.render('players/index.ejs', { players });
});

//GET /players/new (new functionality)
router.get('/new', (req, res) => {
    const characterClasses = User.schema.path('players.charClass').enumValues;
    res.render('players/new.ejs', {characterClasses});
});

//POST /player (create functionality)



module.exports = router;