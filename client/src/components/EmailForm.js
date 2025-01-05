import React, { useState } from "react";
import { generatePrompt, sendEmail } from "../api/emailApi";
import { toast } from "react-toastify";

const EnhancedEmailForm = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleGeneratePrompt = async () => {
    if (!messageType.trim()) {
      setError("Please enter a message type to generate the prompt.");
      return;
    }

    try {
      const response = await generatePrompt(messageType);
      if (response.success) {
        setMessage(response.prompt || `Generated prompt for ${messageType}`);
        toast.success("Prompt generated successfully", {
          autoClose: 2000, // 3 seconds
        });
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("An error occurred while generating the prompt.");
    }
  };

  const handleSendEmail = async () => {
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!subject.trim() || !message.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await sendEmail(email, subject, message);
      if (response.success) {
        // alert("Email sent successfully.");
        toast.success("Email sent successfully.", {
          autoClose: 2000, // 3 seconds
        });

        setEmail("");
        setSubject("");
        setMessage("");
        setMessageType("");
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("An error occurred while sending the email.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Email Composer
        </h1>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter recipient's email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2 border ${
              error && !isValidEmail(email)
                ? "border-red-500"
                : "border-gray-300"
            } rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm`}
          />
          <input
            type="text"
            placeholder="Enter email subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="What type of message?"
              value={messageType}
              onChange={(e) => setMessageType(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <button
              onClick={handleGeneratePrompt}
              className="bg-blue-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Generate
            </button>
          </div>
          <textarea
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            className={`w-full px-4 py-2 border ${
              error && !message.trim() ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm`}
          ></textarea>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <button
            onClick={handleSendEmail}
            className="w-full bg-green-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedEmailForm;
