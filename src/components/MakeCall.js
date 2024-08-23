
import React, { useState } from "react";
import axios from "axios";
import "./MakeCall.css";

function MakeCall() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCall = async () => {
    try {
      const response = await axios.post("http://localhost:3001/make-call", {
        phoneNumber,
      });
      alert("Call initiated: " + response.data.callSid);
    } catch (error) {
      console.error("Error making call:", error);
      alert("Error making call. Please try again.");
    }
  };

  return (
    <div className="call-container">
      <input
        type="text"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleCall}>Make a Call</button>
    </div>
  );
}

export default MakeCall;
