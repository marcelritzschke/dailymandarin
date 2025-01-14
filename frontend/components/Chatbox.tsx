"use client";

import { Message } from "@/types/types";
import { useState, FormEvent, ChangeEvent, KeyboardEvent } from "react";

const ChatBoxComponent: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();

    if (!input.trim()) return; // Prevent empty messages

    const newMessage: Message = { text: input, sender: "user" };
    const allMessages = [...messages, newMessage];
    setMessages(allMessages);
    setInput("");

    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ msg: allMessages }),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      const botMessage: Message = {
        text: data.choices[0].message.content,
        sender: "system",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setLoading(false);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="card h-100" style={{ minHeight: "300px" }}>
      <div className="d-flex flex-column card-body overflow-auto">
        <div className="messages flex-grow-1">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender} ${
                msg.sender === "user" ? "bg-secondary" : ""
              }`}
            >
              <span>{msg.text}</span>
            </div>
          ))}
          {loading && (
            <div
              className="spinner-border text-secondary"
              style={{ width: "1rem", height: "1rem" }}
              role="status"
            >
              <span className="visually-hidden">Typing ...</span>
            </div>
          )}
        </div>
        <form className="mt-3" onSubmit={handleSubmit}>
          <div className="input-group">
            <textarea
              className="form-control bg-secondary chat-input"
              id="textarea-chat-input"
              placeholder="Type a message..."
              value={input}
              onChange={handleChange}
              rows={1}
              onKeyDown={handleKeyDown}
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{ height: "38px" }}
            >
              <i className="bi-send"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBoxComponent;
