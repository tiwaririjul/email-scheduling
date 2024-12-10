const emailService = require("../services/emailService");
const cronManager = require("../cron/emailJob");

const sendEmail = async (req, res) => {
  const { email } = req.body;

  console.log("email ", email);

  if (!email) {
    cronManager.stopCron();
    return res
      .status(400)
      .json({ error: "Email ID is required to start the cron " });
  }

  cronManager.startCron(email);

  res.status(200).json({ message: `cron job started for email : ${email}` });
};

const stopCron = async (req, res) => {
  const responseMessage = cronManager.stopCron();
  res.status(200).json({ message: responseMessage });
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

module.exports = { sendEmail, stopCron, updateEmail };
