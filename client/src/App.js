import React from "react";
import EmailForm from "./components/EmailForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <EmailForm />
      <ToastContainer />
    </div>
  );
}

export default App;
