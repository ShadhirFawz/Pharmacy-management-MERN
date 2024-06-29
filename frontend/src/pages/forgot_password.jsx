import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Input from '../components/Input.jsx';
import MainBtn from '../components/Button.jsx';
import axios from 'axios';

function ForgotPassword() {
  // let { errors, handleSubmit, register } = Validation('forgotPassword')
  const [Email, setEmail] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', Email);
    axios.post('http://localhost:8000/OtpResetPassword', { Email }, { withCredentials: true })
      .then(res => {
        alert('Email sent.')
        navigate(`/resetPassword`);
        console.log(res.data);
      })
      .catch(err => alert('An error has occurred.'));

  }


  return (
    <div>
      {/* <Form title="forget password" inputArr={inputArr} btnArr={btnArr} /> */}
      <form
        className="d-flex justify-content-center"
      >
        <div className="form-width">
          <p className="text-capitalize fs-4">Forgot Password</p>

          <Input
            title='email'
            placeholder='Enter Email'
            type='email'
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="mt-3">
            <MainBtn
              txt='send'
              style='green-btn'
              action={handleSubmit}

            />
            <MainBtn
              txt='Back to Login'
              style='grey-btn'
              action={() => navigate('/login')}

            />
          </div>

        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
