const express = require("express");
const router = express.Router();
const getProfessions = require('../controllers/getProfessions')

router.get('/', getProfessions);

module.exports = router;