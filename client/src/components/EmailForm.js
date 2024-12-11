import React, { useState } from "react";
import { sendEmail, cancelSchedule } from "../api/emailApi";

const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [showCancelForm, setShowCancelForm] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSendEmail = async () => {
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!date || !time) {
      setError("Please select a date and time.");
      return;
    }

    setError("");

    const scheduleDateTime = new Date(`${date}T${time}`);

    if (scheduleDateTime <= new Date()) {
      setError("Please select a future date and time.");
      return;
    }

    const response = await sendEmail(email, scheduleDateTime);
    if (!response.success) {
      alert(response.message);
      return;
    }

    alert("Email scheduled successfully.");
    setEmail("");
    setDate("");
    setTime("");
  };

  const handleCancel = async () => {
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address to cancel.");
      return;
    }

    setError("");

    const response = await cancelSchedule({ email });
    if (!response.success) {
      alert(response.message);
      return;
    }

    alert("Scheduled email canceled successfully.");
    setShowCancelForm(false);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Email Scheduler
        </h1>
        {!showCancelForm ? (
          <>
            <p className="text-sm text-gray-600 text-center mb-6">
              Enter the email and select the date and time to schedule an email.
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
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              <button
                onClick={handleSendEmail}
                className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Schedule Email
              </button>
            </div>
            <button
              onClick={() => setShowCancelForm(true)}
              className="text-red-500 text-sm mt-4 underline focus:outline-none"
            >
              Cancel Scheduled Email
            </button>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-600 text-center mb-6">
              Enter the email address to cancel the scheduled email.
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
                onClick={handleCancel}
                className="w-full bg-red-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Cancel Email Schedule
              </button>
              <button
                onClick={() => setShowCancelForm(false)}
                className="w-full bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 mt-2"
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailForm;
