import NavBar from "../components/NavBar";
import { useLocation , useParams} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function MedicineView() {
  const {name, username} = useParams();
  useEffect(() => {
    const getRequest = {
        url: 'http://localhost:8000/Pharmacist/MedicineByName',
        method: 'GET',
        data: {
          username: {username},
          name: {name}
        },
        headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
      };
      
      axios(getRequest)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        });
      }, [])

return ( 
    <div>
        <NavBar/>
        {name}
        
    </div>
)
}
export default MedicineView;