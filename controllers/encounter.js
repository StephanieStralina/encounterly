const express = require('express');
const router = express.Router();
const User = require('../models/user');

//GET /encounters (index functionality)
router.get('/', (req, res) => {
    res.render('encounters/index.ejs');
});


module.exports = router;