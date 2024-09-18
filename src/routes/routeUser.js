const express = require("express");
const router = express.Router();

// controllers
const getAllUser = require("../controllers/getAllUser");
const postUser = require("../controllers/postUser");
const getUSerByProfession = require("../controllers/getUSerByProfession");
const loginUser = require("../controllers/loginUser");
const updateUser = require("../controllers/updateUser");
const getIdUsers = require("../controllers/getIdUsers");
const searchNameDescripProf = require("../controllers/searchNameDescripProf");

// middleware
const registerMid = require("../middleware/registerMid");

router.get("/", getAllUser);
router.get("/:id", getIdUsers);
router.get("/search/:profession", searchNameDescripProf);
router.post("/profession", getUSerByProfession);
router.post("/", registerMid, postUser);
router.post("/login", loginUser);
router.post("/update", updateUser);
module.exports = router;
