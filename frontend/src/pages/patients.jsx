
import Table from '../components/Table.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBarAdministrator from '../components/NavBarAdministrator.jsx';
import MainBtn from '../components/Button.jsx';
import MedicineList from '../components/medicineList.jsx';

function Patients() {
  const[resultPatient, setResultPatient] = useState([]);

  const {username} = useParams();

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


let navigate = useNavigate()

  let tHeadPatient = ['Name', 'Gender', 'Mobile Number', 'View'];


  return (
    <div>
        <NavBarAdministrator username={username}/>

        <div className="d-flex justify-content-between flex-row">
      <p className="text-capitalize fs-4 w-25">Patients</p>
      <div className="d-flex flex-row w-75 justify-content-end">
        <div className="input-group w-50"></div> 
      </div>
    </div>
      <Table tHead={tHeadPatient} data={resultPatient} filterText='' searchText='' username={username}/>

    </div>
  );
}
export default Patients;
