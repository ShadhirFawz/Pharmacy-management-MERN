import { useState, useEffect } from "react";
import NavBarAdministrator from "../components/NavBarAdministrator";
import { useParams} from 'react-router-dom';
import axios from "axios";
import NavBarPatient from "../components/NavBarPatient";
import CartList from "../components/CartList";
import MainBtn from "../components/Button";
import { useNavigate } from 'react-router-dom';
import TableCart from '../components/TableCart.jsx';




function CarttInfo(){
    let navigate = useNavigate()
    const {username} = useParams();
    const[result, setResult] = useState([]);


    useEffect(() => {
  const response = axios.get(`http://localhost:8000/Patient/viewCartItems/${username}`,{
    headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
  })
  .then(res =>setResult(res.data)).catch(err => console.log(err))
    }, [])
  console.log(result.items)

  let tHead = ['Name', 'Quantity', 'Remove from cart'];
 

    return (
        <div>
        <NavBarPatient username={username}/>
        {result.items && result.items.length>0 &&
        <div>
        <TableCart tHead={tHead} data={result.items} username={username}/>
        
        <MainBtn
              txt="Checkout"
              style="green-btn"
              action={() => navigate(`/checkout/${username}`)}
              key="navBtn"
            />
            </div>
        }
        
        </div>
    )
    }
    export default CarttInfo;