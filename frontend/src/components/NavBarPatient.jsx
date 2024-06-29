import MainBtn from './Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import io from "socket.io-client";

 
import Chat from "./chat";

const socket = io.connect("http://localhost:8000");

function NavBarPatient(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login.loggedIn);
  const[wallet, setWallet] = useState('');
  const [showChat, setShowChat] = useState(false);

  const handleLogout = async (event) => {
    event.preventDefault(); 
    try {
      console.log(sessionStorage.getItem("token"));
      const response = await axios.post(`http://localhost:8000/logout/${props.username}`,"",{
        headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
      });
      sessionStorage.removeItem('token');
      console.log(sessionStorage.getItem("token"));
      navigate(`/login`);}
    catch (error) {
      console.error(error.response ? error.response.data : error.message);
      alert(error.response ? error.response.data.error : error.message);
    }
    };
    useEffect(() => {
      const response = axios.get(`http://localhost:8000/Patient/getPatientWalletAmount/${props.username}`, {
        headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
      })
      .then(res =>setWallet(res.data.walletAmount)).catch(err => console.log(err))
        }, [])
    console.log('www', wallet)

    const joinRoom = () => {
        socket.emit("join_room", 1);
        setShowChat(true);
        //navigate(`/chat/${socket}/${props.username}/1`);
    };
  
  return (
    <nav className="navbar shadow-sm mb-4">
      <div className="d-flex flex-row justify-content-between w-100 align-items-center">
        <div className="d-flex flex-row">
          <a className="navbar-brand">
            <img src='https://i.pinimg.com/originals/57/1a/e3/571ae39ce1b3360b0cf852322b413bdb.jpg' alt="Pharmacy" width={40} height={40} />
          </a>
        </div>
        
    <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-capitalize border-0 bg-transparent`}
        onClick={() => navigate(`/patientView/${props.username}`)}
      >
        Home
      </button>
    </div>    
    <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-capitalize border-0 bg-transparent`}
        onClick={() => navigate(`/prescriptionsList/${props.username}`)}
      >
        Prescriptions
      </button>
    </div>  
    <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-capitalize border-0 bg-transparent`}
        onClick={() => navigate(`/cartInfo/${props.username}`)}
      >
        Cart
      </button>
    </div> 
    <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-capitalize border-0 bg-transparent`}
        onClick={() => navigate(`/orderDetails/${props.username}`)}
      >
        Order History
      </button>
    </div> 
    <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-capitalize border-0 bg-transparent`}
        onClick={() => navigate(`/chatWithPharmacist/${props.username}`)}
      >
        Chat with Pharmacist
      </button>

    </div> 
    <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-capitalize border-0 bg-transparent`}
        onClick={() => navigate(`/changePassword/${props.username}/${'patient'}`)}
      >
        Change Password
      </button>
    </div> 
    <h5>Wallet:{wallet} EGP</h5>

    <div className="d-flex flex-row">
      <button
        className={`red-txt mx-2 text-capitalize border-0 bg-transparent`}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
      
      </div>
    </nav>
  );
}

export default NavBarPatient;
