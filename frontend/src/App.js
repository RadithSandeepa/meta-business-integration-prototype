/*
 *   Copyright (c) 2025 Radith Sandeepa
 *   All rights reserved.
 */
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [platform, setPlatform] = useState("whatsapp");

  // Common states
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  // WhatsApp-specific state
  const [phone, setPhone] = useState("");

  // Facebook-specific state
  const [fbId, setFbId] = useState("");

  // Instagram-specific state
  const [igId, setIgId] = useState("");

  const sendWhatsappMessage = async () => {
    try {
      const res = await axios.post("http://localhost:5000/send-whatsapp", {
        to: phone,
        text: message,
      });
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (err) {
      console.error(err);
      setResponse("Error sending message");
    }
  };

  const sendFacebookMessage = async () => {
    try {
      const res = await axios.post("http://localhost:5000/send-fb", {
        recipientId: fbId,
        message: message,
      });
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (err) {
      console.error(err);
      setResponse("Error sending Facebook message");
    }
  };

  const sendInstagramMessage = async () => {
    try {
      const res = await axios.post("http://localhost:5000/send-instagram", {
        recipientId: igId,
        message: message,
      });
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (err) {
      console.error(err);
      setResponse("Error sending Instagram message");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Multi-Platform Message Sender</h2>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setPlatform("whatsapp")}>WhatsApp</button>
        <button onClick={() => setPlatform("facebook")} style={{ marginLeft: 10 }}>
          Facebook
        </button>
        <button onClick={() => setPlatform("instagram")} style={{ marginLeft: 10 }}>
          Instagram
        </button>
      </div>

      {platform === "whatsapp" && (
        <div>
          <h3>WhatsApp Cloud API - Test UI</h3>
          <input
            type="text"
            placeholder="Recipient number (e.g. 94712345678)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: "300px", marginBottom: 10 }}
          />
          <br />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: "300px", height: "100px" }}
          />
          <br />
          <button onClick={sendWhatsappMessage} style={{ marginTop: 10 }}>
            Send via WhatsApp
          </button>
        </div>
      )}

      {platform === "facebook" && (
        <div>
          <h3>Facebook Messenger API - Test UI</h3>
          <input
            type="text"
            placeholder="Facebook Recipient ID"
            value={fbId}
            onChange={(e) => setFbId(e.target.value)}
            style={{ width: "300px", marginBottom: 10 }}
          />
          <br />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: "300px", height: "100px" }}
          />
          <br />
          <button onClick={sendFacebookMessage} style={{ marginTop: 10 }}>
            Send via Facebook
          </button>
        </div>
      )}

      {platform === "instagram" && (
        <div>
          <h3>Instagram DM API - Test UI</h3>
          <input
            type="text"
            placeholder="Instagram Recipient ID"
            value={igId}
            onChange={(e) => setIgId(e.target.value)}
            style={{ width: "300px", marginBottom: 10 }}
          />
          <br />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: "300px", height: "100px" }}
          />
          <br />
          <button onClick={sendInstagramMessage} style={{ marginTop: 10 }}>
            Send via Instagram
          </button>
        </div>
      )}

      <pre style={{ background: "#eee", padding: 10, marginTop: 20 }}>
        {response}
      </pre>
    </div>
  );
}

export default App;
