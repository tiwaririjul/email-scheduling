import axios from "axios";

// const API_URL = "https://email-scheduling-server-2.onrender.com/api/emails";
const API_URL = "http://localhost:4000/api/emails";

export const sendEmail = async (email, subject, message) => {
  console.log({ email, subject, message });
  try {
    const response = await axios.post(`${API_URL}/schedule-email`, {
      email,
      subject,
      message,
    });
    return response.data;
  } catch (error) {
    console.error("Error in sendEmail:", error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to send the mail",
    };
  }
};

export const generatePrompt = async (prompt) => {
  console.log();
  try {
    const response = await axios.post(`${API_URL}/generate-prompt`, {
      question: prompt,
    });

    console.log("response api ", response);

    return response.data;
  } catch (error) {
    console.error("Error in genrate a prompt:", error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to generate the prompt",
    };
  }
};

// export const cancelSchedule = async ({ email }) => {
//   try {
//     const response = await axios.post(`${API_URL}/cancel-email`, {
//       email,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error in stopCron:", error.message);
//     return {
//       success: false,
//       message: error.response?.data?.message || "Failed to stop the cron job.",
//     };
//   }
// };
