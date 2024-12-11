const express = require("express");
const emailController = require("../controllers/emailController");
const router = express.Router();

router.post("/schedule-email", emailController.scheduleEmail);
router.post("/cancel-email", emailController.cancelEmail);
router.post("/update-email", emailController.updateEmail);

module.exports = router;
