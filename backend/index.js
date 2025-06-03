/*
 *   Copyright (c) 2025 Radith Sandeepa
 *   All rights reserved.
 */
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Server running"));

//facebook
app.post("/send-fb", async (req, res) => {
  const { recipientId, message } = req.body;

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v19.0/${process.env.FB_PAGE_ID}/messages`,
      {
        recipient: { id: recipientId },
        message: { text: message },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FB_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json({ success: true, data: response.data });
  } catch (err) {
    console.error("FB Send Error:", err.response?.data || err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/webhook/facebook", (req, res) => {
  console.log("Webhook Event Received:", JSON.stringify(req.body, null, 2));
  const body = req.body;

  if (body.object === "page") {
    body.entry.forEach((entry) => {
      const messaging = entry.messaging?.[0];
      if (messaging) {
        const senderId = messaging.sender.id;
        const messageText = messaging.message?.text;

        console.log("FB Message Received:", {
          senderId,
          messageText,
        });

        // Here, the system can store the data in a database, trigger order creation, or perform other related actions.
      }
    });

    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// Webhook verification
app.get("/webhook/facebook", (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  console.log("FB Mode:", mode);
  console.log("FB Token received:", token);
  console.log("FB Token expected:", VERIFY_TOKEN);
  console.log("FB Challenge:", challenge);

  if (mode && token === VERIFY_TOKEN) {
    console.log("FACEBOOK WEBHOOK_VERIFIED");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

//instagram
app.post("/send-instagram", async (req, res) => {
  const { recipientId, message } = req.body;

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v19.0/${process.env.IG_BUSINESS_ID}/messages`,
      {
        recipient: { id: recipientId },
        message: { text: message },
        messaging_type: "RESPONSE",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.IG_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json({ success: true, data: response.data });
  } catch (err) {
    console.error("IG Send Error:", err.response?.data || err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/webhook/instagram", (req, res) => {
  console.log("Instagram Webhook Event:", JSON.stringify(req.body, null, 2));
  const body = req.body;

  if (body.object === "instagram") {
    body.entry.forEach((entry) => {
      const messaging = entry.messaging?.[0];
      if (messaging) {
        const senderId = messaging.sender.id;
        const messageText = messaging.message?.text;

        console.log("Instagram DM Received:", {
          senderId,
          messageText,
        });

        // Optional: store to DB, reply logic, etc.
      }
    });

    res.status(200).json({ status: "ok" });
  } else {
    res.sendStatus(404);
  }
});

app.get("/webhook/instagram", (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN; 
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  console.log("IG Mode:", mode);
  console.log("IG Token received:", token);
  console.log("IG Token expected:", VERIFY_TOKEN);
  console.log("IG Challenge:", challenge);

  if (mode && token === VERIFY_TOKEN) {
    console.log("INSTAGRAM WEBHOOK_VERIFIED");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

//whatsapp
app.post("/send-whatsapp", async (req, res) => {
  const { to, text } = req.body;

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v19.0/${process.env.PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: to,
        type: "text",
        text: { body: text },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json({ success: true, data: response.data });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/webhook/whatsapp", (req, res) => {
  console.log("WA Webhook Event Received:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// Webhook verification
app.get("/webhook/whatsapp", (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  console.log("WA Mode:", mode);
  console.log("WA Token received:", token);
  console.log("WA Token expected:", VERIFY_TOKEN);
  console.log("WA Challenge:", challenge);

  if (mode && token === VERIFY_TOKEN) {
    console.log("WHATSAPP WEBHOOK_VERIFIED");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
