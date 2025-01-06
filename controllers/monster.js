const express = require('express');
const router = express.Router();
const Monster = require('../models/monster');
const User = require('../models/user');

//GET /monsters (index functionality)
router.get('/', async (req, res) => {
    const monsters = await Monster.find({});
    res.render('monsters/index.ejs', { monsters });
});


//GET /monsters/new (new functionality)
router.get('/new', (req, res) => {
    res.render('monsters/new.ejs');
});

// POST /monsters (create functionality)
router.post('/', async (req, res) => {
    try {
        const monster = new Monster(req.body);
        await monster.save();
        res.redirect('/monsters');
    } catch (e) {
        console.log(e);
        res.redirect('/monsters'); //TODO add error page
    }
});


//GET /monsters/:monsterId (show functionality)
router.get('/:monsterId', async (req, res) => {
    const monster = await Monster.findById(req.params.monsterId);
    res.render('monsters/show.ejs', { monster });
});

//GET /monsters/:monsterId/edit (edit functionality)
router.get('/:monsterId/edit', async (req, res) => {
    try {
        const monster = await Monster.findById(req.params.monsterId);
        res.render(`monsters/edit.ejs`, { monster })
    } catch (e) {
        console.log(e);
        res.redirect('/monsters') //TODO add error page
    }
});

//PUT /monsters/:monsterId (update functionality)
router.put('/:monsterId', async (req, res) => {
    try {
        console.log(req.body);
        const monsterId = req.params.monsterId;
        await Monster.findByIdAndUpdate(monsterId, req.body);
        res.redirect(`/monsters/${monsterId}`);
    } catch (e) {
        console.log(e);
        res.redirect('/monsters')
    }
});

//DELETE /monsters/:monsterId (delete functionality)
router.delete('/:monsterId', async (req, res) => {
    try {
        await Monster.findByIdAndDelete(req.params.monsterId);
        res.redirect('/monsters');
    } catch(e){
        console.log(e);
        res.redirect('/monsters');
    }
});


module.exports = router;


//Dead code
        // if (req.body.details.abilities.length) {
        //     const abilities = req.body.details.abilities;
        //     const abArray = abilities.map(ability => ({
        //         name: ability.name,
        //         description: ability.description,
        //     }));
        //     req.body.details.abilities = abArray;
        // }