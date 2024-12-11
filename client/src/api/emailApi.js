import axios from "axios";

const API_URL = "https://email-scheduling-server-2.onrender.com/api/emails";
// const API_URL = "http://localhost:4000/api/emails";

export const sendEmail = async (email, scheduleDateTime) => {
  console.log({ email, scheduleDateTime });
  try {
    const response = await axios.post(`${API_URL}/schedule-email`, {
      email,
      scheduleDateTime,
    });
    return response.data;
  } catch (error) {
    console.error("Error in sendEmail:", error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to start the cron job.",
    };
  }
};

export const cancelSchedule = async ({ email }) => {
  try {
    const response = await axios.post(`${API_URL}/cancel-email`, {
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Error in stopCron:", error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to stop the cron job.",
    };
  }
};
