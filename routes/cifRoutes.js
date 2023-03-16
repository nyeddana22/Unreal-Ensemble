const express = require("express");
const cifController = require("../controllers/cifController");

const router = express.Router();

router.get("/", cifController.getBase);
router.post("/getActions", cifController.getActions);
router.post("/loadSocialStructure", cifController.loadSocialStructure);
router.post("/addCharacters", cifController.loadSocialStructure);
router.post("/addRules", cifController.loadSocialStructure);
router.post("/addActions", cifController.loadSocialStructure);
router.post("/addHistory", cifController.loadSocialStructure);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

module.exports = router;
