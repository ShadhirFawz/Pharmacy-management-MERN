import { useNavigate } from 'react-router-dom';
import Form from '../components/Form.jsx';
import Validation from '../validate/validate.js';
import NavBar from '../components/NavBar.jsx';
import { useState } from 'react';
import axios from 'axios';
import Input from '../components/Input.jsx';
import MainBtn from '../components/Button.jsx';

function RegisterPatient() {
  // let {errors,handleSubmit,register} = Validation('createAccount')
  // const navigate = useNavigate();
  // let c = (data) => {
  //   console.log(data);
  // }
  // let inputArr = [
  //   { title: 'username', placeholder: 'enter your username', type:'text', showErr:errors.username?.message, register: register("username")},
  //   { title: 'name', placeholder: 'enter your name', type:'text', showErr:errors.name?.message, register: register("name") },
  //   { title: 'email', placeholder: 'enter your email', type:'email', showErr:errors.email?.message, register: register("email")},
  //   { title: 'password', placeholder: 'enter password',type:'password', showErr:errors.password?.message, register: register("password") },
  //   { title: 'confirm password', placeholder: 'enter password',type:'password', showErr:errors.confirmPassword?.message, register: register("confirmPassword") },
  //   { title: 'date of birth', placeholder: 'enter your date of birth', type:'date', showErr:errors.dateOfBirth?.message, register: register("dateOfBirth") },
  //   { title: 'gender', placeholder: 'select your gender', type:'text', showErr:errors.gender?.message, register: register("gender") },
  //   { title: 'mobile number', placeholder: 'enter your mobile number', type: 'tel', showErr:errors.mobileNumber?.message, register: register("mobileNumber") },
  //   { title: 'Emergency contact full name', placeholder: 'enter your emergency contact full name', type:'text', showErr:errors.emergencyName?.message, register: register("emergencyName") },
  //   { title: 'Emergency contact mobile number', placeholder: 'enter your emergency contact mobile number', type:'text', showErr:errors.emergencyMobile?.message, register: register("emergencyMobile") },
  //   { title: 'Emergency contact relation to the patient', placeholder: 'enter your emergency contact relation to the patient', type:'text', showErr:errors.emergencyRelation?.message, register: register("emergencyRelation") },



  // ];
  // let btnArr = [
  //   {
  //     title: 'create account',
  //     style: 'green-btn',
  //     action: handleSubmit(c),
  //   },
  // ];
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nationalId, setNationalId] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [emergencyName, setEmergencyName] = useState('')
  const [emergencyMobile, setEmergencyMobile] = useState('')
  const [emergencyRelation, setEmergencyRelation] = useState('')
  const [address, setAddress] = useState('')
  const navigate = useNavigate();


  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const data = {Username:username, Name:name, NationalID: nationalId, Email:email, Password:password, DateOfBirth:dateOfBirth, Gender:gender, MobileNumber:mobileNumber, EmergencyContactName:emergencyName, EmergencyContactMobile:emergencyMobile, EmergencyContactRelation:emergencyRelation, address: address}
      console.log(data)
      const response = await axios.post('http://localhost:8000/Guest/RegisterPatient', data)
      
          if (response.status === 200) {
            alert(`Registered successfully`);
            console.log(response.data.message);
            navigate(`/login`);
          } else {
            alert(`Failed to register. Status: ${response.status}`);
          }
        } catch (error) {
          alert(`Failed to register. Error: ${error.message}`);
          console.error('Error accepting request:', error);
        }
 
      // await axios.post('http://localhost:8000/Guest/RegisterPatient',
      //   data)
      // .then(res =>console.log(data)).catch(err => console.log(err.request))
      // navigate(`/login`);
    }
  return (
    <div>
      <NavBar/>
      {/* <Form
        title="create account"
        inputArr={inputArr}
        btnArr={btnArr}
        type="register"
      /> */}
       {/* <form onSubmit={handleSubmit}>
        <h3>
        <label>Name</label>
        <input  title= 'name' required placeholder= 'enter name' type= 'text' onChange={(e) => setName(e.target.value)} />
        </h3>
  <h3>
    <label>Username</label>
  <input type="text" value={username} required title="Username" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)}/>
  </h3>
  <h3>
  <label>Email</label>
  <input type="email" value={email} required title="Email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/>
  </h3>
  <h3>
  <label>Password</label>
  <input type="password" value={password} required title="Password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>
  </h3>
  <h3>
  <label>Date Of Birth</label>
  <input type="date" value={dateOfBirth} required title="Date Of Birth" placeholder="Enter Date Of Birth" onChange={(e) => setDateOfBirth(e.target.value)}/>
  </h3>
  <h3>
  <label>Gender</label>
  <input type="text" value={gender} required title="Gender" placeholder="Enter Gender" onChange={(e) => setGender(e.target.value)}/>
  </h3>
  <h3>
  <label>Mobile Number</label>
  <input type="text" value={mobileNumber} required title="Mobile Number" placeholder="Enter Mobile Number" onChange={(e) => setMobileNumber(e.target.value)}/>
  </h3>
  <h3>
  <label>Emergency Contact Name</label>
  <input type="text" value={emergencyName} required title="Emergency Contact Name" placeholder="Enter Emergency Contact Name" onChange={(e) => setEmergencyName(e.target.value)}/>
  </h3>
  <h3>
  <label>Emergency Contact Mobile Number</label>
  <input type="text" value={emergencyMobile} required title="Emergency Contact Mobile" placeholder="Enter Emergency Contact Mobile" onChange={(e) => setEmergencyMobile(e.target.value)}/>
  </h3>
  <h3>
  <label>Emergency Contact Relation</label>
  <input type="text" value={emergencyRelation} required title="Emergency Contact Relation" placeholder="Enter Emergency Contact Relation" onChange={(e) => setEmergencyRelation(e.target.value)}/>
  </h3>
  <h3>
  <label>Address</label>
  <input type="text" value={address} required title="Address" placeholder="Enter Your Address" onChange={(e) => setAddress(e.target.value)}/>
  </h3>
  <h3>
  <button type="submit">Submit</button>
  </h3>
</form> */}
<form
        className="d-flex justify-content-center"
        onSubmit={handleSubmit}
      >
      <div style={{ width: '35%' }} className="form-width">
          <p className="text-capitalize fs-4">Register As Patient</p>
          <Input
            title='Name'
            required={true}
            placeholder='Enter name'
            type='text'
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            title='Username'
            required={true}
            placeholder='Enter username'
            type='text'
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            title='Email'
            required={true}
            placeholder='Enter email'
            type='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            title='Password'
            required={true}
            placeholder='Enter password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            title='Natioanl ID'
            required={true}
            placeholder='Enter natioanl Id'
            type='text'
            onChange={(e) => setNationalId(e.target.value)}
          />
          <Input
            title='Date Of Birth'
            required={true}
            placeholder='Enter date'
            type='date'
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
          <Input
            title='Gender'
            required={true}
            placeholder='Enter gender'
            type='text'
            onChange={(e) => setGender(e.target.value)}
          />
          <Input
            title='Mobile Number'
            required={true}
            placeholder='Enter mobile number'
            type='text'
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          <Input
            title='Emergency Contact Full Name'
            required={true}
            placeholder='Enter emergency contact full name'
            type='text'
            onChange={(e) => setEmergencyName(e.target.value)}
          />
          <Input
            title='Emergency Contact Mobile Number'
            required={true}
            placeholder='Enter emergency contact mobile number'
            type='text'
            onChange={(e) => setEmergencyMobile(e.target.value)}
          />
          <Input
            title='Emergency Contact Relation to Patient'
            required={true}
            placeholder='Enter emergency contact relation'
            type='text'
            onChange={(e) => setEmergencyRelation(e.target.value)}
          />
          <Input
            title='Address'
            required={true}
            placeholder='Enter address'
            type='text'
            onChange={(e) => setAddress(e.target.value)}
          />

         
          <div className="mt-3">
            <MainBtn
              txt='Submit'
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
export default RegisterPatient;
