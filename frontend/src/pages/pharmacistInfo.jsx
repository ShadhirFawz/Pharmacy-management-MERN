import { useState, useEffect } from "react";
import NavBarAdministrator from "../components/NavBarAdministrator";
import { useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import MainBtn from "../components/Button";

function PharmacistInfo(){
    const {username, usernameAdmin} = useParams();
    const[result, setResult] = useState([]);
    const[resultDelete, setResultDelete] = useState([]);
    let navigate = useNavigate();



    useEffect(() => {
  const response = axios.get(`http://localhost:8000/Admin/PharmacistInfo/${usernameAdmin}/${username}`,{
    headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
  })
  .then(res =>setResult(res.data)).catch(err => console.log(err))
    }, [])

  console.log(result)

  const handleRemove=() => {
    const response = axios.delete(`http://localhost:8000/Admin/RemovePatientOrPharmacist/${usernameAdmin}/${username}`,{
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    })
  .then(res =>{alert("Pharmacist removed"); navigate(`/pharmacists/${usernameAdmin}`)}).catch(err => console.log(err))
  }
  console.log(resultDelete)

return (
    <div>
        <NavBarAdministrator username={usernameAdmin}/>
        <h1>Pharmacist Info</h1>
        <ul>
        <h3>Name: {result.Name}</h3>
            <h3>UserName: {result.Username}</h3>
            <h3>Email: {result.Email}</h3>
            <h3>Date of Birth: {result.DateOfBirth && result.DateOfBirth.substring(0,10)}</h3>
            <h3>Hourly Rate: {result.HourlyRate}</h3>
            <h3>Affiliation: {result.Affiliation}</h3>
            <h3>Educational Background: {result.EducationalBackground}</h3>

        </ul>
        <div className="input-group w-25">
          <MainBtn
            txt="Remove Pharmacist"
            style="green-btn"
            action={handleRemove}
            key="navBtn"
          />
        </div>
        </div>
)
}
export default PharmacistInfo;