const express = require('express');
const router = express.Router();
const Encounter = require('../models/encounter');
const User = require('../models/user');

//GET /encounters (index functionality)
router.get('/', async (req, res) => {
    const encounters = await Encounter.find({ user: req.user._id} );
    res.render('encounters/index.ejs', { encounters });
});


module.exports = router;