import "../assets/Chat.css";
//import { useState } from "react";
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import io from "socket.io-client";

 
import Chat from "../components/chat";
import NavBarPharmacist from "../components/NavBarPharmacist";

const socket = io.connect("http://localhost:8000");

function ChatPharmacistOptions() {
  const {username} = useParams();
  //const [room, setRoom] = useState('');
  const navigate = useNavigate();


  const [showChat1, setShowChat1] = useState(false);
  const [showChat2, setShowChat2] = useState(false);

  const joinRoom1 = () => {
    socket.emit("join_room", 1);
    setShowChat1(true);
};

const joinRoom2 = () => {
  socket.emit("join_room", 2);
  setShowChat2(true);
};

  return (
    <div>
    <NavBarPharmacist username={username} />

    {/* <div className="App">
      <div className="joinChatContainer">

    {!showChat1 ? (
      <button
      className={`green-txt mx-2 text-capitalize border-0 bg-transparent`}
      onClick={joinRoom1}
    >
      Start Chat With a patient
    </button>
      ) : (
        <Chat socket={socket} username={username} room={1} />
      )}

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

    </div> */}
    <div className="d-flex flex-row justify-content-center">
    {!showChat1 ? (
      <button
        className={`green-txt mx-2 text-capitalize border-0 bg-transparent`}
        onClick={joinRoom1}
      >
        Start Chat with patient
      </button>
      ) : (
        <Chat socket={socket} username={username} room={1} />
      )}
    </div>
    <div className="d-flex flex-row justify-content-center">
    {!showChat2 ? (
      <button
        className={`green-txt mx-2 text-capitalize border-0 bg-transparent`}
        onClick={joinRoom2}
      >
        Start Chat with doctor
      </button>
      ) : (
        <Chat socket={socket} username={username} room={2} />
      )}
    </div>
    </div>
  );
}

export default ChatPharmacistOptions;