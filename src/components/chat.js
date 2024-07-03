import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane,faRobot,faUser } from '@fortawesome/free-solid-svg-icons';
import {Button} from "react-bootstrap"

const ChatbotComponent = () => {
    const [prompt, setPrompt] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [visi, setvisi] = useState(false);
    const [loading, setloading] = useState(false);
    const clickHandlert=()=>{
        const newPrompt = "ncbae timings";
        setPrompt(newPrompt);
        sendMessage( newPrompt);
      }
      const clickHandlerr=()=>{
        const newPrompt = "what's rank of ncbae ";
        setPrompt(newPrompt);
        sendMessage( newPrompt);
      }
      const clickHandleroc=()=>{
        const newPrompt = "Which courses does ncbae offer";
        setPrompt(newPrompt);
        sendMessage( newPrompt);
      }
      const clickHandlerc=()=>{
        const newPrompt = "Ncbae office timings";
        setPrompt(newPrompt);
        sendMessage( newPrompt);
      }

    const sendMessage = async () => {
        if (!prompt.trim()) return; // Prevent sending empty prompts
        setvisi(true);
        setloading(true); // Set loading to true when the request starts

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/chat/', { prompt });
            const newChat = [...chatHistory, { prompt, response: response.data.response }];
            setChatHistory(newChat);
            setPrompt('');
        } catch (error) {
            console.error('Error sending message:', error.message);
        } finally {
            setloading(false); // Set loading to false when the request finishes
        }
    };


    return (
        <div className="chatbot-container">
            <span ><Button  style={{fontSize:"15px"}}variant='outline-light'>Restore history</Button></span>
            <h2 style={{marginBottom:"15px",marginTop:"15px"}}> Ncbae Chatbot <FontAwesomeIcon icon={faRobot}/></h2>
            <div className='d-flex flex-wrap '><Button variant="outline-primary"  style={{marginBottom:"20px", fontSize:"13px",margin:"7px"}} onClick={clickHandlert}>Ncbae timing</Button>
            <Button variant="outline-primary"  style={{marginBottom:"20px", fontSize:"13px",margin:"7px"}} onClick={clickHandlerr}>Ncbae rank</Button>
            <Button variant="outline-primary"  style={{marginBottom:"20px", fontSize:"13px",margin:"7px"}} onClick={clickHandleroc}>Ncbae offered courses</Button>
            <Button variant="outline-primary"  style={{marginBottom:"20px", fontSize:"13px",margin:"7px"}} onClick={clickHandlerc}>Ncbae Contact #</Button></div>
            
            {visi && (<><div className="chat-container">
                
                    {chatHistory.map((chat, index) => (
                    <div key={index} className="chat-item">
                        <div className="user-message">
                            <strong>You  <FontAwesomeIcon icon={faUser}/></strong> {chat.prompt}
                        </div>
                        <div className="bot-message">
                            <strong>Ncbae bot:</strong> {chat.response}
                        </div>
                    </div>
                ))} 
                            </div>
                </>)}
                
            <div className="input-container">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Type your prompt..."
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                    className="input-field"
                />
                <button onClick={sendMessage}  style={{ backgroundColor: loading ? '#ccc' : '#007bff', cursor: loading ? 'not-allowed' : 'pointer' }}className="send-button" disabled={loading}>{loading ? "generating" : (<>Send <FontAwesomeIcon icon={faPaperPlane}/></>) } </button>
            </div>
        </div>
    );
};

export default ChatbotComponent;
