import React from "react";
import { Message } from "../App";

interface ChatBoxProps {
  messages: Message[];
}
const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
  return (
    <div className="chat-box">
      {" "}
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.role}`}>
          {" "}
          <strong>
            {" "}
            {message.role !== "system" && message.role === "user"
              ? "You"
              : "ChatGPT"}
            :{" "}
          </strong>{" "}
          {message.content}{" "}
        </div>
      ))}{" "}
    </div>
  );
};
export default ChatBox;
