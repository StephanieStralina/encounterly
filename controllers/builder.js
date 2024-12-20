const express = require('express');
const router = express.Router();

// Middleware to protect selected routes
const ensureSignedIn = require('../middleware/ensure-signed-in');

// All routes start with '/unicorns'



module.exports = router;