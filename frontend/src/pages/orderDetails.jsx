import { useState, useEffect } from "react";
import NavBarAdministrator from "../components/NavBarAdministrator";
import { useParams} from 'react-router-dom';
import axios from "axios";
import NavBarPatient from "../components/NavBarPatient";
import CartList from "../components/CartList";
import MainBtn from "../components/Button";
import { useNavigate } from 'react-router-dom';
import OrderList from "../components/OrderList";
import TableOrder from "../components/TableOrder";



function OrderDetails(){
    let navigate = useNavigate()

    const {username} = useParams();
    const [id, setId] = useState('');
    const[result, setResult] = useState([]);

    useEffect(() => {
  const response = axios.get(`http://localhost:8000/Patient/GetOrderDetails/${username}`, {
    headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
  })
  .then(res =>setResult(res.data)).catch(err => console.log(err))
    }, [])
  //  setId(result._id);
  console.log('iddd', result);
    result.map((e) => {console.log(e)})
//  let tHead = ['Name', 'Amount'];
 let tHead = ['Order ID', 'Payment Method', 'Status', 'Total Amount', 'Shipping Address', 'View Items', 'Cancel Order'];


    return (
        <div>
        <NavBarPatient username={username}/>
        <h2>Order Details</h2>
 
        {/* <h3>Payment Method: {e.PaymentMethod}</h3>
        <h3>Status: {e.Status}</h3>
        <h3>Total Amount: {e.TotalAmount}</h3>
        <h3>Shipping Address: {e.ShippingAddress}</h3> */}
        <TableOrder tHead={tHead} data={result} username={username}/>
        
        </div>
    )
    }
    export default OrderDetails;