import "../assets/Chat.css";
//import { useState } from "react";
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import io from "socket.io-client";

 
import Chat from "../components/chat";

const socket = io.connect("http://localhost:8000");

function DoctorChat() {
  const {username} = useParams();
  //const [room, setRoom] = useState('');
  const navigate = useNavigate();

  const [showChat2, setShowChat2] = useState(false);

const joinRoom2 = () => {
  socket.emit("join_room", 2);
  setShowChat2(true);
};

  return (
    <div className="App">
      <div className="joinChatContainer">

    {!showChat2 ? (
      <button
        onClick={joinRoom2}
      >
        Chat with a doctor
      </button>
      ) : (
        <Chat socket={socket} username={username} room={2} />
      )}
          </div>

    </div>
  );
}

export default DoctorChat;