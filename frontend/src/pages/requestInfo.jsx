import { useState, useEffect } from "react";
import NavBarAdministrator from "../components/NavBarAdministrator";
import { useParams, useNavigate} from 'react-router-dom';
import axios from "axios";
import MainBtn from "../components/Button";


function RequestInfo(){
    const {username, usernameAdmin} = useParams();
    const[result, setResult] = useState([]);
    const navigate = useNavigate();
    

    const handleAccept = async (Username, action) => {
      try{
        const response =await axios.post(`http://localhost:8000/Admin/acceptOrRejectPharmacistRequest/${usernameAdmin}/${Username}`, { action: 'accept' },
        {
          headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
        });
        if (response.status === 200) {
            alert(`Pharamcist accepted successfully`);
            console.log(response.data.message);
            //navigate('/administratorView');
          }}
          catch(error){
            alert(`Failed to accept Pharamcist `);
            console.error('Error response:', error.response);
              console.error('Error accepting request:', error);
          };
  };

  const handleReject = async (Username, action) => {
    try{
      const response =await axios.post(`http://localhost:8000/Admin/acceptOrRejectPharmacistRequest/${usernameAdmin}/${Username}`, {action: 'reject'},
      {
        headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
      });
      if (response.status === 200) {
            alert(`Pharamcist rejected successfully`);
              console.log(response.data.message);
              //navigate('/administratorView');
          }}
          catch(error ){
            alert(`Failed to reject Pharamcist `);
            console.error('Error rejecting request:', error);
          };
  };
  const handleAcceptReject = async (action) => {
    try {
      const response = await axios.post(`http://localhost:8000/Admin/acceptOrRejectPharmacistRequest/${usernameAdmin}/${username}`, {action},{
        headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
      });
      alert(`Pharmacist ${action === 'accept' ? 'accepted' : 'rejected'} successfully`);
      console.log(response.data.message);
      //navigate('/administratorView');
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      console.error('Error response:', error.response);
      alert(`Failed to ${action} pharmacist: ${errorMessage}`);
    }
  };
  
    useEffect(() => {
  const response = axios.get(`http://localhost:8000/Admin/InfosOfAPharmacistRequest/${usernameAdmin}/${username}`,{
    headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
  })
  .then(res =>setResult(res.data)).catch(err => console.log(err))
    }, [])

  console.log(result)

//   result.map((e) => {
//     console.log(e)
//   })

return (
    <div>
        <NavBarAdministrator username={usernameAdmin}/>
        <h1>Pharmacist Request Info</h1>
        <ul>
            <h3>Name: {result.Name}</h3>
            <h3>UserName: {result.Username}</h3>
            <h3>Email: {result.Email}</h3>
            <h3>Date of Birth: {result.DateOfBirth && result.DateOfBirth.substring(0,10)}</h3>
            <h3>Hourly Rate: {result.HourlyRate}</h3>
            <h3>Affiliation: {result.Affiliation}</h3>
            <h3>Educational Background: {result.EducationalBackground}</h3>
            <h3>Request Status: {result.Status}</h3>

        </ul>
        {/* <button>
            Accept Request
        </button> */}
        <div>
        <div className="input-group w-25">
            <MainBtn
              txt="Accept request"
              style="green-btn"
              action={() => handleAcceptReject('accept')}
              // action={() => navigate('/administratorView')}
              key="navBtn"
            />
            </div>
            <div className="input-group w-25">
             <MainBtn
              txt="Reject Request"
              style="white-btn"
              action={() => handleAcceptReject('reject')}
              // action={() => navigate('/administratorView')}
              key="navBtn"
            />
          </div>
          </div>
        {/* <button>
            Reject Request
        </button> */}
        </div>
)
}
export default RequestInfo;