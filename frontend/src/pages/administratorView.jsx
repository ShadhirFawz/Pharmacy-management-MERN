
import Table from '../components/Table.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBarAdministrator from '../components/NavBarAdministrator.jsx';
import MainBtn from '../components/Button.jsx';
import MedicineList from '../components/medicineList.jsx';

function AdministratorView() {
  const[searchText, setSearchText] = useState('');
  const[filterText, setFilterText] = useState('');
  const[resultPatient, setResultPatient] = useState([]);
  const[resultPharmacist, setResultPharmacist] = useState([]);
  const[resultRequest, setResultRequest] = useState([]);
  const {username} = useParams();
// Inside your AdministratorView component

const onAcceptOrReject = async (Username, action) => {
  try {
      const response = await axios.post(`http://localhost:8000/Admin/acceptOrRejectPharmacistRequest/${username}/${Username}`, {action}, {
        headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
      });
      if (response.status === 200) {
          alert(`Pharmacist ${action === 'accept' ? 'accepted' : 'rejected'} successfully`);
          // remove the request ml list
          setResultRequest(prevRequests => prevRequests.filter(request => request.Username !== Username));
      }
  } catch (error) {
      console.error(error.response?.data?.error || error.message);
      alert(`Failed to ${action === 'accept' ? 'accept' : 'reject'} pharmacist`);
  }
};
  useEffect(() => {
const response = axios.get(`http://localhost:8000/Admin/AllPatients/${username}`,{
  headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
})
.then(res =>setResultPatient(res.data)).catch(err => console.log(err))
  }, [])
console.log(resultPatient)
resultPatient.map((e) => {
  console.log(e)
})

useEffect(() => {
  const response = axios.get(`http://localhost:8000/Admin/AllPharmacists/${username}`,{
    headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
  })
  .then(res =>setResultPharmacist(res.data)).catch(err => console.log(err))
    }, [])
  console.log(resultPharmacist)
  resultPharmacist.map((e) => {
    console.log(e)
  })

  useEffect(() => {
    const response = axios.get(`http://localhost:8000/Admin/InfosOfRequestsByPharmacist/${username}`,{
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    })
    .then(res =>setResultRequest(res.data)).catch(err => console.log(err))
      }, [])
    console.log(resultRequest)
    resultRequest.map((e) => {
      console.log(e)
    })

const onFilterValueChanged=(event)=>{
  setFilterText(event.target.value);
}
console.log(filterText)
let navigate = useNavigate()

  let tHeadPatient = ['Name', 'Gender', 'Mobile Number', 'View'];
  let dataPatient = [{
    name: 'Joy',
    gender: 'female',
    age: 20,
    email: 'joy@gmail.com',
    mobileNumber: '013232312321',
    username: 'joy123'
  }
];

  let tHeadPharmacist = ['Name', 'Affiliation', 'Hourly Rate', 'EducationalBackground', 'View'];
  let dataPharmacist = [{
    name: 'Mohamed',
    affiliation: 'X hospital',
    hourlyRate: 1000,
    educationalBackground: 'pharmacy',
    username: 'mohamed123'

  }
];
  let tHeadRequests = ['Name', 'Affiliation', 'Hourly Rate', 'EducationalBackground', 'View', 'Status'];
  let dataRequests = [{
    name: 'Ahmed',
    affiliation: 'Y Hospital',
    hourlyRate: 1000,
    educationalBackground: 'pharmacy',
    username: 'ahmed123'

  }
];


  return (
    <div>
        <NavBarAdministrator username={username}/>
          <MedicineList/>

    </div>
  );
}
export default AdministratorView;
