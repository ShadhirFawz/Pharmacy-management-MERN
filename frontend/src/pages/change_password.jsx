import MainBtn from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import { useState } from 'react';
import NavBar from '../components/NavBar.jsx';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import NavBarPatient from '../components/NavBarPatient.jsx';
import NavBarPharmacist from '../components/NavBarPharmacist.jsx';
import NavBarAdministrator from '../components/NavBarAdministrator.jsx';



function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { username, type } = useParams();
  console.log(username)
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const data = { oldPassword: oldPassword, newPassword: password, confirmPassword: confirmPassword };
      const response = await axios.put(
        `http://localhost:8000/ChangePassword/${username}`,
        data,
        {
          withCredentials: true,
          auth: {
            username: username,
            password: oldPassword,
          },
        }
      );      
      if (response.status === 200) {
        alert(`Password updated successfully`);
        console.log(response.data.message);
        const res = await axios.post(`http://localhost:8000/logout/${username}`,"",{
          headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
        });
        sessionStorage.removeItem('token');
        navigate(`/login`);
      } else if (response.status === 401) {
        alert(`Failed to update password. Invalid old password.`);
      } else {
        alert(`Failed to update password. Status: ${response.status}`);
      }
    } catch (error) {
      alert(`Failed to update password. Error: ${error.message}`);
      console.error('Error accepting request:', error);
    }
  };
  
  return (
    <div>
      {type==='patient' &&       <NavBarPatient username={username}/>}
      {type==='pharmacist' &&       <NavBarPharmacist username={username}/>}
      {type==='admin' &&       <NavBarAdministrator username={username}/>}

      {/* <Form title="change password" inputArr={inputArr} btnArr={btnArr} /> */}
      <form
        className="d-flex justify-content-center"
      >
        <div className="form-width">
          <p className="text-capitalize fs-4">Change Password</p>

          <Input
            title='old password'
            placeholder='enter old password'
            type='password'
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <Input
            title='New password'
            placeholder='enter new password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            title='confirm Password'
            placeholder='confirm password'
            type='password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />


          {/* {type == 'register' && (
          <p className="text-center mt-3 small-txt">
            By Creating an account you agree to our
            <a className="green-txt"> Terms of use </a>
            and
            <a className="green-txt"> Privacy Policy</a>
          </p>
        )} */}

          <div className="mt-3">
            <MainBtn
              txt='save'
              style='green-btn'
              action={handleSubmit}

            />
          </div>
        </div>
      </form>
    </div>
  );
}
export default ChangePassword;
