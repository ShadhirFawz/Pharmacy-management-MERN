import { useNavigate } from 'react-router-dom';
import Form from '../components/Form.jsx';
import Validation from '../validate/validate.js';
import NavBar from '../components/NavBar.jsx';
import { useState } from 'react';
import axios from 'axios';
import Input from '../components/Input.jsx';
import MainBtn from '../components/Button.jsx';

function RegisterPharmacist() {
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
  //   { title: 'hourly rate', placeholder: 'Enter your hourly rate', type:'text', showErr:errors.hourlyRate?.message, register: register("hourlyRate") },
  //   { title: 'affiliation', placeholder: 'enter hospital name', type: 'text', showErr:errors.affiliation?.message, register: register("affiliation") },
  //   { title: 'Educational background', placeholder: 'enter your educational background', type:'text', showErr:errors.educationalBackground?.message, register: register("educationalBackground") },


  // ];
  // let btnArr = [
  //   {
  //     title: 'create account',
  //     style: 'green-btn',
  //     action: handleSubmit(c),
  //   },
  // ];

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [hourlyRate, setHourlyRate] = useState(0);
  const [affiliation, setAffiliation] = useState('');
  const [educationalBackground, setEducationalBackground] = useState('');
  const [IDDocument, setIDDocument] = useState('');
  const [PharmacyDegreeDocument, setPharmacyDegreeDocument] = useState('');
  const [WorkingLicenseDocument, setWorkingLicenseDocument] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

      // Append other form fields
      data.append('Name', name);
      data.append('Username', username);
      data.append('Email', email);
      data.append('Password', password);
      data.append('DateOfBirth', dateOfBirth);
      data.append('HourlyRate', hourlyRate);
      data.append('Affiliation', affiliation);
      data.append('EducationalBackground', educationalBackground);

      // Append file uploads
      data.append('IDDocument', IDDocument);
      data.append('PharmacyDegreeDocument', PharmacyDegreeDocument);
      data.append('WorkingLicenseDocument', WorkingLicenseDocument);

      console.log(data);

      const response = await axios.post(
        'http://localhost:8000/Guest/SubmitRequestToBePharmacist',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response && response.data) {
        // Check if there is a 'message' property in the response data
        if (response.data.message) {
          alert(`Registered successfully: ${response.data.message}`);
          navigate(`/login`);
        } else {
          alert(`Failed to register. Response: ${JSON.stringify(response.data)}`);
        }
      } else {
        alert(`Failed to register. Unexpected response format.`);
      }
    } catch (error) {
      alert(`Failed to register. Error: ${error.message}`);
      console.error('Error accepting request:', error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server response:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
      }
    }
  }

  return (
    <div>
      <NavBar />
      {/* <form onSubmit={handleSubmit}>
        <h3>
          <label>Name</label>
          <input title='name' required placeholder='enter name' type='text' onChange={(e) => setName(e.target.value)} />
        </h3>
        <h3>
          <label>Username</label>
          <input type="text" required title="Username" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
        </h3>
        <h3>
          <label>Email</label>
          <input type="email" required title="Email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
        </h3>
        <h3>
          <label>Password</label>
          <input type="password" required title="Password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
        </h3>
        <h3>
          <label>Date Of Birth</label>
          <input type="date" required title="Date Of Birth" placeholder="Enter Date Of Birth" onChange={(e) => setDateOfBirth(e.target.value)} />
        </h3>
        <h3>
          <label>Hourly Rate</label>
          <input type="number" required title="Hourly Rate" placeholder="Enter Hourly Rate" onChange={(e) => setHourlyRate(e.target.value)} />
        </h3>
        <h3>
          <label>Affiliation</label>
          <input type="text" required title="Affiliation" placeholder="Enter Affiliation" onChange={(e) => setAffiliation(e.target.value)} />
        </h3>
        <h3>
          <label>Educational Background</label>
          <input type="text" required title="Educational Background" placeholder="Enter Educational Background" onChange={(e) => setEducationalBackground(e.target.value)} />
        </h3>
        <h3>
          <label>ID Document</label>
          <input type="file" required title="IDDocument" onChange={(e) => setIDDocument(e.target.files[0])} />
        </h3>
        <h3>
          <label>Pharmacy Degree Document</label>
          <input type="file" required title="PharmacyDegreeDocument" onChange={(e) => setPharmacyDegreeDocument(e.target.files[0])} />
        </h3>
        <h3>
          <label>Working License Document</label>
          <input type="file" required title="WorkingLicenseDocument" onChange={(e) => setWorkingLicenseDocument(e.target.files[0])} />
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
          <p className="text-capitalize fs-4">Register As Pharmacist</p>
          <Input
            title='Name'
            required={true}
            placeholder='Enter Name'
            type='text'
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            title='Username'
            required={true}
            placeholder='Enter Username'
            type='text'
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            title='Email'
            required={true}
            placeholder='Enter Email'
            type='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            title='Password'
            required={true}
            placeholder='Enter Password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            title='Date Of Birth'
            required={true}
            placeholder='Enter Date'
            type='date'
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
          <Input
            title='Hourly Rate'
            required={true}
            placeholder='Enter Hourly Rate'
            type='number'
            onChange={(e) => setHourlyRate(e.target.value)}
          />
          <Input
            title='Affiliation'
            required={true}
            placeholder='Enter Affiliation'
            type='text'
            onChange={(e) => setAffiliation(e.target.value)}
          />
          <Input
            title='Educational Background'
            required={true}
            placeholder='Enter Educational Background'
            type='text'
            onChange={(e) => setEducationalBackground(e.target.value)}
          />
          <Input
            title='ID'
            required={true}
            placeholder='Enter ID Document'
            type='file'
            onChange={(e) => setIDDocument(e.target.files[0])}
          />
          <Input
            title='Pharmacy Degree'
            required={true}
            placeholder='Enter Pharmacy Degree Document'
            type='file'
            onChange={(e) => setPharmacyDegreeDocument(e.target.files[0])}
          />
          <Input
            title='Working License'
            required={true}
            placeholder='Enter Working License Document'
            type='file'
            onChange={(e) => setWorkingLicenseDocument(e.target.files[0])}
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
export default RegisterPharmacist;
