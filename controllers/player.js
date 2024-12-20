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
router.get('/:playerId', (req, res) => {
    const player = req.user.players.id(req.params.playerId);
    res.render('players/show.ejs', {player});
})

//GET /players/:playerId/edit (edit functionality)
router.get('/:playerId/edit', (req, res) => {
    try {
        const player = req.user.players.id(req.params.playerId);
        const characterClasses = User.schema.path('players.charClass').enumValues;
        res.render('players/edit.ejs', { player, characterClasses });
    } catch(e) {
        console.log(e);
        res.redirect('/players');
    }
});

//PUT /players/:playerId (update functionality)
router.put('/:playerId', async (req, res) => {
    try {
        const player = req.user.players.id(req.params.playerId);
        player.set(req.body);
        await req.user.save();
        res.redirect(`/players/${player._id}`);
    } catch(e) {
        console.log(e);
        res.redirect('/players');
    }
});


//DELETE /players/:playerId (delete functionality)
router.delete('/:playerId', async (req, res) => {
    try {
        const player = req.user.players.pull(req.params.playerId);
        await req.user.save();
        res.redirect('/players');
    } catch(e) {
        console.log(e);
        res.redirect('/players');
    }
});






module.exports = router;