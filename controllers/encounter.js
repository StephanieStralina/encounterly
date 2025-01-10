const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Encounter = require('../models/encounter');
const Monster = require('../models/monster');
const User = require('../models/user');

// All paths start with '/encounters'

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
        const playerIds = req.body.players ? req.body.players.map(playerId => new mongoose.Types.ObjectId(`${playerId}`)) : [];
        const enemyIds = req.body.enemies ? req.body.enemies.map(enemyId => new mongoose.Types.ObjectId(`${enemyId}`)) : [];
        
        const players = req.user.players.filter(player => 
            playerIds.some(playerId => playerId.equals(player._id))
        );
        const monsters = enemyIds.length > 0 ? await Monster.find({ _id: { $in: enemyIds } }) : [];

        const thresholds = {
            1: { easy: 25, medium: 50, hard: 75, deadly: 100 },
            2: { easy: 50, medium: 100, hard: 150, deadly: 200 },
            3: { easy: 75, medium: 150, hard: 225, deadly: 400 },
            4: { easy: 125, medium: 250, hard: 375, deadly: 500 },
            5: { easy: 250, medium: 500, hard: 750, deadly: 1100 },
            6: { easy: 300, medium: 600, hard: 900, deadly: 1400 },
            7: { easy: 350, medium: 750, hard: 1100, deadly: 1700 },
            8: { easy: 450, medium: 900, hard: 1400, deadly: 2100 },
            9: { easy: 550, medium: 1100, hard: 1600, deadly: 2400 },
            10: { easy: 600, medium: 1200, hard: 1900, deadly: 2800 },
            11: { easy: 800, medium: 1600, hard: 2400, deadly: 3600 },
            12: { easy: 1000, medium: 2000, hard: 3000, deadly: 4500 },
            13: { easy: 1100, medium: 2200, hard: 3400, deadly: 5100 },
            14: { easy: 1250, medium: 2500, hard: 3800, deadly: 5700 },
            15: { easy: 1400, medium: 2800, hard: 4300, deadly: 6400 },
            16: { easy: 1600, medium: 3200, hard: 4800, deadly: 7200 },
            17: { easy: 2000, medium: 3900, hard: 5900, deadly: 8800 },
            18: { easy: 2100, medium: 4200, hard: 6300, deadly: 9500 },
            19: { easy: 2400, medium: 4900, hard: 7300, deadly: 10900 },
            20: { easy: 2800, medium: 5700, hard: 8500, deadly: 12700 }
        };

        const totalThresholds = { easy: 0, medium: 0, hard: 0, deadly: 0 };
        players.forEach(player => {
            const levelThresholds = thresholds[player.charLevel];
            if (levelThresholds) {
                totalThresholds.easy += levelThresholds.easy;
                totalThresholds.medium += levelThresholds.medium;
                totalThresholds.hard += levelThresholds.hard;
                totalThresholds.deadly += levelThresholds.deadly;
            }
        });

        const totalMonsterXP = monsters.reduce((sum, monster) => sum + monster.xp, 0);
        console.log({ totalMonsterXP, totalThresholds });

        let difficulty;
        if (totalMonsterXP <= totalThresholds.easy) difficulty = "Easy";
        else if (totalMonsterXP <= totalThresholds.medium) difficulty = "Medium";
        else if (totalMonsterXP <= totalThresholds.hard) difficulty = "Hard";
        else difficulty = "Deadly";

        req.body.players = playerIds;
        req.body.enemies = enemyIds;

        const encounter = new Encounter(req.body);
        encounter.user = req.user._id;
        encounter.difficulty = difficulty;
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
    res.render('encounters/show.ejs', { encounter, players });
    } catch(e) {
        console.log(e);
        res.redirect('/encounters');
    }
});


//GET /encounters/:encounterID/edit (edit functionality)
router.get('/:encounterId/edit', async (req, res) => {
    try {
        const encounter = await Encounter.findById(req.params.encounterId).populate('enemies');
        const players = req.user.players;
        const selectedPlayers = encounter.players.map(playerId => playerId.toString());
        const monsters = await Monster.find({ user: req.user._id});
        const selectedEnemies = encounter.enemies.map(enemy => enemy._id.toString());
        res.render('encounters/edit.ejs', { encounter, players, selectedPlayers, monsters, selectedEnemies});
    } catch(e) {
        console.log(e);
        res.redirect('/encounters');
    }
});

//PUT /encounters/:encounterID/ (update functionality)
router.put('/:encounterId', async (req, res) => {
    try {
        const encounterId = req.params.encounterId;
        const {players, enemies} = req.body;
        req.body.players = Array.isArray(players) ? players : [];
        req.body.enemies = Array.isArray(enemies) ? enemies : [];
        await Encounter.findByIdAndUpdate(encounterId, req.body);
        res.redirect(`/encounters/${encounterId}`);
    } catch(e) {
        console.log(e);
        res.redirect('/encounters')
    }
});

//DELETE /encounters/:encounterID/ (delete functionality)
router.delete('/:encounterId', async (req, res) => {
    try {
        await Encounter.findByIdAndDelete(req.params.encounterId);
        res.redirect('/encounters');
    } catch(e) {
        console.log(e);
        res.redirect('/encounters');
    }
});




module.exports = router;