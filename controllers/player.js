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
router.post('/', async (req, res) => {
    try {
        req.user.players.push(req.body);
        await req.user.save();
        res.redirect('/players');
    } catch(e) {
        console.log(e)
        res.redirect('/players');
    }
});

//GET /players/:playerId (show functionality)
router.get('/:playerId', async (req, res) => {
    const player = req.user.players.id(req.params.playerId);
    res.render('players/show.ejs', {player});
})

module.exports = router;