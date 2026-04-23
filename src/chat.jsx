import React, { useState } from "react";
import axios from "axios";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    const newChat = [...chat, { role: "user", text: message }];
    setChat(newChat);

    try {
      const res = await axios.post("http://localhost:5000/chat", {
        message: message,
      });

      setChat([
        ...newChat,
        { role: "bot", text: res.data.reply },
      ]);
    } catch (error) {
      console.error(error);
    }

    setMessage("");
  };

  return (
    <div>
      <h2>Gemini Chatbot</h2>

      <div style={{ border: "1px solid gray", padding: "10px", height: "300px", overflowY: "auto" }}>
        {chat.map((msg, index) => (
          <div key={index}>
            <b>{msg.role === "user" ? "You" : "Bot"}:</b> {msg.text}
          </div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chatbot;