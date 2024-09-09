import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faRobot, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

const ChatbotComponent = () => {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [visi, setVisi] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state to track loading status

  const sendMessage = async () => {
    if (!prompt.trim()) return; // Prevent sending empty prompts
    setVisi(true);
    setIsLoading(true); // Start loading state

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/chat/", {
        prompt,
      });
      const newChat = [
        ...chatHistory,
        { prompt, response: response.data.response },
      ];
      setChatHistory(newChat);
      setPrompt("");
    } catch (error) {
      console.error("Error sending message:", error.message);
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  return (
    <div className="chatbot-container">
      <h2 className="headline">
        Ncbae Chatbot <FontAwesomeIcon icon={faRobot} />
      </h2>
      <Button variant="primary" className="mt-3 mb-3">
        Restore history
      </Button>
      {visi ? (
        <></>
      ) : (
        <p className="text-warning mt-5 mb-5">No previous chat</p>
      )}
      {visi && (
        <>
          <div className="chat-container">
            {chatHistory.map((chat, index) => (
              <div key={index} className="chat-item">
                <div className="user-message">
                  <strong>
                    <FontAwesomeIcon icon={faUser} />
                  </strong>{" "}
                  {chat.prompt}
                </div>
                <div className="bot-message">
                  <strong>Ncbae bot:</strong> {chat.response}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="input-container">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          className="input-field"
        />
        <button
          onClick={sendMessage}
          className="send-button"
          style={{
            backgroundColor: isLoading ? "gray" : "#007bff",
            color: isLoading ? "white" : "#fff",
          }}
        >
          {isLoading ? (
            <>
              generating...
            </>
          ) : (
            <>
              Send <FontAwesomeIcon icon={faPaperPlane} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatbotComponent;
