import React, { useState } from "react";
import { sendEmail, stopCron } from "../api/emailApi";

const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSendEmail = async () => {
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");

    const response = await sendEmail(email);
    if (!response.success) {
      alert(response.message);
      setEmail("");
      return;
    }
    alert("Cron job started successfully.");
    setEmail("");
  };

  const handleStop = async () => {
    const response = await stopCron();
    if (!response.success) {
      alert(response.message);
      return;
    }
    alert("Cron job stopped successfully.");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Email Scheduler
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter the email of the person you want to send the email to.
        </p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2 border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <button
            onClick={handleSendEmail}
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Start Email Scheduler
          </button>
          <button
            onClick={handleStop}
            className="w-full bg-red-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Stop Cron Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailForm;
