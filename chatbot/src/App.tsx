import { useState } from "react";
import ChatBox from "./components/ChatBox";
import axios from "axios";
import "./App.css";
import MessageInput from "./components/MessageInput";

export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

function App() {
  const [msgs, setMsgs] = useState<Message[]>([
    { role: "system", content: "You are ChatGPT" },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = async (message: string) => {
    setIsLoading(true);
    const userMessage: Message = { role: "user", content: message };
    const newMsgs = [...msgs, userMessage];
    setMsgs(newMsgs);
    try {
      const response = await axios.post("http://localhost:4000/chat", {
        msgs: newMsgs,
      });
      const botMessage: Message = {
        role: "assistant",
        content: response.data.reply,
      };
      setMsgs([...newMsgs, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="App">
      <h1>ChatGPT Interface</h1>
      <ChatBox messages={msgs} />
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}

export default App;
