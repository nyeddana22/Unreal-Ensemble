const cif = require("../ensemble/ensemble");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

exports.getBase = async (req, res) => {
  res.status(200).json({ version: 1.0, status: "cooking out great stories" });
};

exports.getActions = async (req, res) => {
  try {
    const {
      initiator,
      responder,
      volition,
      cast,
      numIntents,
      numActionsPerIntent,
      numActionsPerGroup,
    } = req.body;

    const actionParams = {
      ...(initiator && { initiator }),
      ...(responder && { responder }),
      ...(volition && { volition }),
      ...(cast && { cast }),
      ...(numIntents && { numIntents }),
      ...(numActionsPerIntent && { numActionsPerIntent }),
      ...(numActionsPerGroup && { numActionsPerGroup }),
    };

    const possibleActions = cif.getActions(actionParams);
    res.status(200).json({ possibleActions: possibleActions });
  } catch (e) {
    res.status(400).json({ error: true, e });
  }
};

const handleUpload = async (req, res, next, action) => {
  try {
    let data;
    await new Promise((resolve, reject) => {
      upload(req, res, function (err) {
        if (err) reject(err);
        else resolve();
      });
    });
    let result;
    if (req.file) {
      const filename = req.file.filename;
      result = action(
        JSON.parse(fs.readFileSync(`uploads/${filename}`, "utf8"))
      );
    } else if (req.body && Object.keys(req.body).length) {
      data = req.body;
      result = action(data.data);
    } else {
      throw new Error("No file or JSON data provided");
    }

    res.status(200).json({ message: "Schema uploaded successfully", result });
  } catch (e) {
    res.status(400).json({ error: true, message: e.message });
  }
};

exports.loadSocialStructure = async (req, res, next) => {
  await handleUpload(req, res, next, cif.loadSocialStructure);
};

exports.addCharacters = async (req, res, next) => {
  await handleUpload(req, res, next, cif.addCharacters);
};

exports.addRules = async (req, res, next) => {
  await handleUpload(req, res, next, cif.addRules);
};

exports.addActions = async (req, res, next) => {
  await handleUpload(req, res, next, cif.addActions);
};

exports.addHistory = async (req, res, next) => {
  await handleUpload(req, res, next, cif.addHistory);
};

exports.doAction = async (req, res) => {
  try {
    const { boundAction } = req.body;

    const possibleActions = cif.doAction(boundAction);
    res.status(200).json({ possibleActions: possibleActions });
  } catch (e) {
    res.status(400).json({ error: true, e });
  }
};

exports.runTriggerRules = async (req, res) => {
  try {
    const { cast } = req.body;

    cif.runTriggerRules(cast);
    res.status(200).json({ message: "Trigger Rules run successfully" });
  } catch (e) {
    res.status(400).json({ error: true, e });
  }
};

exports.get = async (req, res) => {
  try {
    const { getPredicate } = req.body;

    const results = cif.get(getPredicate);
    res.status(200).json({ results });
  } catch (e) {
    res.status(400).json({ error: true, e });
  }
};

exports.calculateVolition = async (req, res) => {
  try {
    const { cast } = req.body;

    const volitions = cif.calculateVolition(cast);
    res.status(200).json({ volitions });
  } catch (e) {
    res.status(400).json({ error: true, e });
  }
};

exports.setupNextTimeStep = async (req, res) => {
  try {
    const { timestep } = req.body;

    const actionParams = {
      ...(timestep && { timestep }),
    };

    cif.setupNextTimeStep(actionParams);
    res.status(200).json({ message: "Setup next time step successfully" });
  } catch (e) {
    res.status(400).json({ error: true, e });
  }
};
