const express = require("express");
const twilio = require("twilio");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 5000;

// Load Twilio credentials from .env file
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const apiKeySid = process.env.TWILIO_API_KEY_SID;
const apiKeySecret = process.env.TWILIO_API_KEY_SECRET;
const client = new twilio(apiKeySid, apiKeySecret, { accountSid });

app.use(express.json());

app.post("/make-call", (req, res) => {
  const { phoneNumber } = req.body;

  client.calls
    .create({
      url: "http://demo.twilio.com/docs/voice.xml",
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
    })
    .then((call) => res.json({ success: true, callSid: call.sid }))
    .catch((error) => res.status(500).json({ success: false, error: error.message }));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
