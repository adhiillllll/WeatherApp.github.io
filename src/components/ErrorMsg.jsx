import React from "react";
import "./ErrorMsg.css";

const ErrorMsg = ({ message }) => {
  if (!message) return null;

  return (
    <div className="error-msg">
      ⚠️ {message}
    </div>
  );
};

export default ErrorMsg;