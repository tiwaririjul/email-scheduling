import axios from "axios";

const API_URL = "https://email-scheduling-server-1.onrender.com/api/emails";

export const sendEmail = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/start-cron`, { email });
    return response.data;
  } catch (error) {
    console.error("Error in sendEmail:", error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to start the cron job.",
    };
  }
};

export const stopCron = async () => {
  try {
    const response = await axios.get(`${API_URL}/stop-cron`);
    return response.data;
  } catch (error) {
    console.error("Error in stopCron:", error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to stop the cron job.",
    };
  }
};
