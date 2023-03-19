const express = require("express");
const cifController = require("../controllers/cifController");

const router = express.Router();

router.get("/", cifController.getBase);
router.post("/getActions", cifController.getActions);
router.post("/loadSocialStructure", cifController.loadSocialStructure);
router.post("/addCharacters", cifController.addCharacters);
router.post("/addRules", cifController.addRules);
router.post("/addActions", cifController.addActions);
router.post("/addHistory", cifController.addHistory);
router.post("/doAction", cifController.doAction);
router.post("/runTriggerRules", cifController.runTriggerRules);
router.post("/get", cifController.get);
router.post("/calculateVolition", cifController.calculateVolition);
router.post("/setupNextTimeStep", cifController.setupNextTimeStep);
router.post("/volitionAndCast", cifController.volitionAndAction);

module.exports = router;
