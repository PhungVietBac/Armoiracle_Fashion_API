const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/user_clothes_ctrl");

router.post("/", ctrl.createUserClothes);

router.delete("/", ctrl.deleteUserClothes);

module.exports = router;
