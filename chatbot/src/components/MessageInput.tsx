import React, { useState, ChangeEvent, FormEvent } from "react";
interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}
const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  isLoading,
}) => {
  const [message, setMessage] = useState<string>("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  return (
    <form className="message-input" onSubmit={handleSubmit}>
      {" "}
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Type your message..."
      />{" "}
      <button type="submit" disabled={isLoading}>
        Send
      </button>
    </form>
  );
};
export default MessageInput;
