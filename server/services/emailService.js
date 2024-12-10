const transporter = require("../config/mailConfig");

const sendEmail = async (email) => {
  if (!email) {
    throw new Error("Email ID is required to send an email");
  }
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Hourly Update",
      text: "This is an automated email sent every hour.",
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendEmail };
