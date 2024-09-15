const express = require("express");
const router = express.Router();
const postReview = require("../controllers/postReview");

router.post("/", postReview);
module.exports = router;
