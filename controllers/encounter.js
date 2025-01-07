const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Encounter = require('../models/encounter');
const Monster = require('../models/monster');
const User = require('../models/user');

//GET /encounters (index functionality)
router.get('/', async (req, res) => {
    const encounters = await Encounter.find({ user: req.user._id} );
    res.render('encounters/index.ejs', { encounters});
});

//GET /encounters/new (new functionality)
router.get('/new', async(req,res) => {
    try {
        const players = req.user.players;
        const monsters = await Monster.find({ user: req.user._id});
        res.render('encounters/new.ejs', { players, monsters });
    } catch(e) {
        console.log(e);
        res.redirect('/encounters');
    }
});

//POST /encounters (create functionality)
router.post('/', async (req, res) => {
    try {
        req.body.players = req.body.players ? req.body.players.map(playerId => new mongoose.Types.ObjectId(`${playerId}`)) : [];
        req.body.enemies = req.body.enemies ? req.body.enemies.map(enemyId => new mongoose.Types.ObjectId(`${enemyId}`)) : [];
        const encounter = new Encounter(req.body);
        encounter.user = req.user._id;
        await encounter.save();
        res.redirect('/encounters');
    } catch(e) {
        console.log(e);
        res.redirect('/encounters');
    }
});

//GET /encounters/:encounterID (show functionality)
router.get('/:encounterId', async (req, res) => {
    try {
    const encounter = await Encounter.findById(req.params.encounterId).populate('enemies');
    const user = await User.findById(encounter.user);
    const players = user.players.filter(player =>
            encounter.players.includes(player._id.toString())
        );
    console.log(players);
    res.render('encounters/show.ejs', { encounter, players });
    } catch(e) {
        console.log(e);
        res.redirect('/encounters');
    }
});


//GET /encounters/:encounterID/edit (edit functionality)


//PUT /encounters/:encounterID/ (update functionality)





module.exports = router;