import { useNavigate, useParams } from 'react-router-dom';
import Form from '../components/Form.jsx';
import { useDispatch } from 'react-redux';
import { loggedIn } from '../features/login.js';
import Validation from '../validate/validate';
import NavBarAdministrator from '../components/NavBarAdministrator.jsx';
import { useState } from 'react';
import axios from 'axios'
import Input from '../components/Input.jsx';
import MainBtn from '../components/Button.jsx';

function AddAdministrator() {
  // let { errors, handleSubmit, register } = Validation('username')
  // let c = (data) => {
  //   console.log(data);
  // }
  // let inputArr = [
  //   { title: 'username', placeholder: 'enter username', type: 'username', showErr: errors.username?.message, register: register("username"),  },
  //   { title: 'password', placeholder: 'enter password', type: 'password', showErr: errors.password?.message, register: register("password") },
  // ];
  // let btnArr = [
  //   {
  //     title: 'Add Administrator',
  //     style: 'green-btn',
  //     action: handleSubmit(),
  //   },
  // ];
  const [Username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [user, setUser] = useState(null);
  const {username} = useParams();

  const axiosJWT = axios.create();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = {Username:Username, Password:password, Email:email}
    console.log(data);
    console.log(sessionStorage.getItem("token"));
    await axios.post(`http://localhost:8000/Admin/AddAdmin/${username}`,data,{
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    })
    .then(res => alert("Administrator added successfully")).catch(err => alert("Failed to add administrator", err));
    window.location.reload(true);
     
  }

  return (
    <div>
      <NavBarAdministrator username={username}/>
      {/* <Form title="Add Administrator" inputArr={inputArr} type="addAdministrator" btnArr={btnArr} /> */}
      {/* <form onSubmit={handleSubmit}>
  <input  title= 'username' required placeholder= 'enter username' type= 'text' onChange={(e) => setUsername(e.target.value)} />
  <input type="email" required title="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/>
  <input type="password" required title="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>
  <button type="submit">Submit</button>
</form> */}
<form
        className="d-flex justify-content-center"
        onSubmit={handleSubmit}
      >
        <div className="form-width">
          <p className="text-capitalize fs-4">Add Administrator</p>
          <Input
            title='username'
            required={true}
            placeholder='Enter usernname'
            type='text'
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            title='email'
            required={true}
            placeholder='Enter email'
            type='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            title='password'
            required={true}
            placeholder='Enter password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
         
          <div className="mt-3">
            <MainBtn
              txt='submit'
              type="submit"
              style='green-btn'
              //action={handleSubmit}

            />
          </div>

        </div>
      </form>
    </div>
  );
}
export default AddAdministrator;
