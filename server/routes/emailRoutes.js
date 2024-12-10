const express = require("express");
const emailController = require("../controllers/emailController");
const router = express.Router();

router.post("/start-cron", emailController.sendEmail);
router.get("/stop-cron", emailController.stopCron);
router.post("/update-email", emailController.updateEmail);

module.exports = router;
