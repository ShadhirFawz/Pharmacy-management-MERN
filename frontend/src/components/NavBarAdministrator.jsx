import MainBtn from './Button';
import logo from '../assets/images/svg/logo.svg';
import notify from '../assets/images/svg/notification.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showUserDrop } from '../features/userDropDown.js';
import DropDown from './Dropdown.jsx';
import axios from 'axios';
function NavBarAdministrator(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login.loggedIn);

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
        onClick={() => navigate(`/administratorView/${props.username}`)}
      >
        Home
      </button>
      </div>

      <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-capitalize border-0 bg-transparent`}
        onClick={() => navigate(`/patients/${props.username}`)}
      >
        Patients
      </button>
      </div>

      <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-capitalize border-0 bg-transparent`}
        onClick={() => navigate(`/pharmacists/${props.username}`)}
      >
        Pharmacists
      </button>
      </div>

      <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-capitalize border-0 bg-transparent`}
        onClick={() => navigate(`/salesReportInfo/${props.username}/${"admin"}`)}
      >
        Sales Report
      </button>
      </div>

      <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-capitalize border-0 bg-transparent`}
        onClick={() =>navigate(`/addAdministrator/${props.username}`)}
      >
        Add Administrator
      </button>
      </div>

      <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-capitalize border-0 bg-transparent`}
        onClick={() => navigate(`/changePassword/${props.username}/${'admin'}`)}
      >
        Change Password
      </button>
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

export default NavBarAdministrator;
