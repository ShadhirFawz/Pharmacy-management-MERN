import MainBtn from './Button';
import logo from '../assets/images/svg/logo.svg';
import notify from '../assets/images/svg/notification.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showUserDrop } from '../features/userDropDown.js';
import DropDown from './Dropdown.jsx';
import axios from 'axios';
import { useEffect, useState } from 'react';
function NavBarPharmacist(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login.loggedIn);
  const[wallet, setWallet] = useState('');

    
  useEffect(() => {
    const response = axios.get(`http://localhost:8000/Pharmacist/getPharmacistWalletAmount/${props.username}`, {
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    })
    .then(res =>setWallet(res.data.walletAmount)).catch(err => console.log(err))
      }, [])
      console.log('www', wallet)

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
        onClick={() => navigate(`/pharmacistView/${props.username}`)}
      >
        Home
      </button>
    </div>

    <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-capitalize border-0 bg-transparent`}
        onClick={() => navigate(`/notificationsPharmacist/${props.username}`)}
      >
        Notifications
      </button>
    </div>

    <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-capitalize border-0 bg-transparent`}
        onClick={() => navigate(`/salesReportInfo/${props.username}/${"pharmacist"}`)}
      >
        Sales Report
      </button>
    </div>

    <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-capitalize border-0 bg-transparent`}
        onClick={() => navigate(`/chatPharmacistOptions/${props.username}`)}
      >
        Chat
      </button>
    </div>

    <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-capitalize border-0 bg-transparent`}
        onClick={() => navigate(`/changePassword/${props.username}/${'pharmacist'}`)}
      >
        Change Password
      </button>
    </div>
          <div>
          <h5>Wallet: {wallet} EGP</h5>
          </div>

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

export default NavBarPharmacist;
