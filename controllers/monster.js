const express = require('express');
const router = express.Router();
const Monster = require('../models/monster');
const User = require('../models/user');

//GET /monsters (index functionality)
router.get('/', (req, res) => {
    res.render('monsters/index.ejs');
});

//GET /monsters/new (new functionality)
router.get('/new', (req, res) => {
    res.render('monsters/new.ejs');
});




module.exports = router;