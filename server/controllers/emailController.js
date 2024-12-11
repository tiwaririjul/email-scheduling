// const emailService = require("../services/emailService");
const { sendEmail } = require("../services/emailService");
const cronManager = require("../cron/emailJob");
const schedule = require("node-schedule");

const scheduledJobs = {};

const scheduleEmail = async (req, res) => {
  const { email, scheduleDateTime } = req.body;

  if (!email || !scheduleDateTime) {
    return res.status(400).json({ success: false, message: "Invalid input." });
  }

  const scheduleTime = new Date(scheduleDateTime);

  if (scheduleTime <= new Date()) {
    return res
      .status(400)
      .json({ success: false, message: "Time must be in the future." });
  }

  // if (scheduledJobs[email]) {
  //   scheduledJobs[email].cancel();
  // }

  const job = schedule.scheduleJob(scheduleDateTime, async () => {
    try {
      await sendEmail(email);
      console.log(`Email sent to ${email} at ${scheduleDateTime}`);
      delete scheduledJobs[email];
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  });

  scheduledJobs[email] = job;

  res.status(200).json({ success: true, message: "Email scheduled." });
};

const cancelEmail = async (req, res) => {
  const { email } = req.body;

  if (scheduledJobs[email]) {
    scheduledJobs[email].cancel();
    delete scheduledJobs[email];
    res.json({
      success: true,
      message: "Scheduled email canceled successfully.",
    });
  } else {
    res.json({
      success: false,
      message: "No scheduled email found to cancel.",
    });
  }
};

const updateEmail = async (req, res) => {
  const { email } = req.body;

  console.log("updating the email", email);

  if (!email) {
    return res
      .status(400)
      .json({ error: "Email ID is required to update the cron" });
  }

  cronManager.startCron(email);
  res.status(200).json({ message: `Cron job updated for email: ${email}` });
};

module.exports = { scheduleEmail, cancelEmail, updateEmail };
