const express = require('express');
const router = express.Router();
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
    } catch (e) {
        console.log(e);
        res.redirect('/encounters');
    }
});









module.exports = router;