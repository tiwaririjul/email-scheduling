const cron = require("node-cron");
const emailService = require("../services/emailService");

let currentCronJob = null;
let currentEmail = null;

const startCron = (email) => {
  console.log(currentCronJob, " ", currentEmail);
  if (currentCronJob) {
    currentCronJob.stop();
    console.log("Stopped existing cron job");
  }

  currentEmail = email;
  currentCronJob = cron.schedule("* * * * *", async () => {
    console.log(`Running Cron Job: Sending email to ${currentEmail}`);
    try {
      await emailService.sendEmail(currentEmail);
      console.log(`Email sent to ${currentEmail}`);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  });

  console.log(`Cron job started for email: ${currentEmail}`);
};

const stopCron = () => {
  let message = "";
  console.log("stoping curtent job ", currentCronJob);
  if (currentCronJob) {
    currentCronJob.stop();
    currentCronJob = null;
    currentEmail = null;
    message = "cron job stopped successfully";
  } else {
    message = "No cron job to stop";
  }

  return message;
};

module.exports = { startCron, stopCron };
