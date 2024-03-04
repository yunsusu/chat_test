import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "react-chat-elements/dist/main.css";
import {
  Avatar,
  Button,
  ChatItem,
  ChatList,
  Dropdown,
  Input,
  LocationMessage,
  MeetingItem,
  MeetingLink,
  MeetingMessage,
  MessageBox,
  MessageList,
  Navbar,
  Popup,
  Sidebar,
  SpotifyMessage,
  SystemMessage,
} from "react-chat-elements";
import { ChatEngine } from "react-chat-engine";

const socket = io("http://localhost:3000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const inputValue = "";

  const messageListReferance = React.createRef();
  const inputReferance = React.createRef();
  useEffect(() => {
    const receiveMessage = (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    };

    socket.on("chat message", receiveMessage);

    return () => {
      socket.off("chat message", receiveMessage);
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message !== "") {
      socket.emit("chat message", message);
      setMessage("");
    }
  };
  console.log(chat);
  return (
    <>
      <MessageLists
        messages={[
          { user: "User1", text: "Hello!" },
          { user: "User2", text: "How are you?" },
        ]}
      />
      <ChatInput />
    </>
  );
};

function MessageLists(props) {
  return (
    <div className="messages">
      {props.messages.map((message, index) => (
        <div key={index} className="message">
          <strong>{message.user}:</strong> {message.text}
        </div>
      ))}
    </div>
  );
}
function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={message} onChange={handleChange} />
      <button type="submit">Send</button>
    </form>
  );
}

export default Chat;
