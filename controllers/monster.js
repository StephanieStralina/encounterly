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

//POST /monsters (create functionality)
router.post('/', async (req, res) => {
    try {
        req.body.user = req.user._id;
        await Monster.create(req.body);
        res.redirect('/monsters', { Monster });
    } catch (e) {
        console.log(e);
        res.redirect('/monsters'); //TODO add error page
    }
});


module.exports = router;