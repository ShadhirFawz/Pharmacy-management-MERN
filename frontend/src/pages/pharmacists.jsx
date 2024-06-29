
import Table from '../components/Table.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBarAdministrator from '../components/NavBarAdministrator.jsx';
import MainBtn from '../components/Button.jsx';
import MedicineList from '../components/medicineList.jsx';

function Pharmacists() {

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

let navigate = useNavigate()

  let tHeadPharmacist = ['Name', 'Affiliation', 'Hourly Rate', 'EducationalBackground', 'View'];
  let tHeadRequests = ['Name', 'Affiliation', 'Hourly Rate', 'EducationalBackground', 'View', 'Status'];


  return (
    <div>
        <NavBarAdministrator username={username}/>

      <div className="d-flex justify-content-between flex-row">
      <p className="text-capitalize fs-4 w-25">Pharmacists</p>
      <div className="d-flex flex-row w-75 justify-content-end">
        <div className="input-group w-50"></div> 
      </div>
    </div>

      <Table tHead={tHeadPharmacist} data={resultPharmacist} filterText='' searchText='' username={username}/>


    <div className="d-flex justify-content-between flex-row">
      <p className="text-capitalize fs-4 w-25">Pharmacists Requests</p>
      <div className="d-flex flex-row w-75 justify-content-end">
        <div className="input-group w-50"></div> 
      </div>
    </div>
      <Table tHead={tHeadRequests} data={resultRequest} filterText='' searchText='' username={username}/>

    </div>
  );
}
export default Pharmacists;
