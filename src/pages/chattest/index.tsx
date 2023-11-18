"use client"

import { useState } from "react";
import { io } from "socket.io-client";

import styles from "./page.module.css";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<string[]>([]);
  const [userName, setUserName] = useState('')

  // Connect with server
  
  const socket = io("http://localhost:5000");

  // Send input message to server
  const handleSendMessage = () => {
    // Send to server
    socket.emit("send_message", {
      message: message,
      sender: userName
    });

    // Reset input after send
    setMessage("");
  };

  // Receive message from server
  socket.on("received_message", (data) => {
    // Append to message list
    setMessageList([...messageList, data]);
  });

  // Username change
  const handleNameChange = (ev: any) => {
    const newvalue = ev.target.value;
    setUserName(newvalue);
  }

  return (
    <div className={styles.container}>
      <h2>Realtime Chat App</h2>
      <div className={styles.chatInputButton}>
        <label htmlFor="">username</label>
        <input type="text" onChange={handleNameChange} /><br />
        <br />
        <label htmlFor="">message</label>
        <input
          type="text"
          placeholder="Enter your message."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br />
        <br />
        <button onClick={handleSendMessage}>Send Message</button>
      </div>
      {messageList.map((chat: any) => (
        <div className={styles.chatArea} key={chat.message}>
          { chat.sender + "->"}{chat.message}
        </div>
      ))}
    </div>
  );
}
