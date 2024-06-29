import { useState, useEffect } from "react";
import MainBtn from "../components/Button";
import Input from "../components/Input";
import NavBarPatient from "../components/NavBarPatient";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TableAddresses from "../components/TableAddresses";


function Checkout() { 
    const [address, setAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
    const [allAddresses, setAllAddresses] = useState([]);
    const [cardNumber, setCardNumber] = useState('');
    const [cardDate, setCardDate] = useState('');
    const [cardCVV, setCardCVV] = useState('');

    const [type, setType] = useState('');

    const {username} = useParams();
    let navigate = useNavigate()
    console.log('del',deliveryAddress)
    console.log('typee', type)

    useEffect(() => {
      const response = axios.get(`http://localhost:8000/Patient/GetPatientAddresses/${username}`,{
        headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
      })
      .then(res =>setAllAddresses(res.data)).catch(err => console.log(err))
        }, [])
        console.log('all add', allAddresses);

        const handleAdd = (e) => {
          if(cardCVV && cardDate && cardNumber){
          alert('Card added successfully')
          }
          else{
            alert('Missing fields')
          }
          e.preventDefault();
        }

    const handleSubmit = (e) => {
      const data = {newAddress:address};
      console.log(data)
      const response = axios.post(`http://localhost:8000/Patient/AddAddressToPatient/${username}`, data, {
        headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
      })
  .then(res =>console.log(res.data)).catch(err => console.log(err))
    }
console.log('typeee', type)

    const handleSubmitOrder = async(e) => {
     // try{
      if(type==='card' && !(cardCVV && cardDate && cardNumber)){
        alert('Missing fields')
      }
        else{

          axios.post(`http://localhost:8000/Patient/checkoutOrder/${username}/${type}/${deliveryAddress}`,"",{
          headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
        })
        .then(navigate(`/orderDetails/${username}`)).catch(err => alert('Failed to submit order order: ',err))
        // if (response.status === 200) {
        //       navigate(`/orderDetails/${username}`);
        //         console.log(response.data.message);
        // }
        //     }
        //     else{
        //       alert(`Failed to submit order `);
        //       //console.error('Error removing item:', error);
        //     };
        e.preventDefault();  
        }

      }

  let tHead = ['Address', 'Select'];


    return(
        <div>
            <NavBarPatient username={username}/>
 <form
      //style={{ width: '100%' }}
      className="d-flex justify-content-center "
    >
      <div style={{ width: '40%' }} className="form-width">
        <p className="text-capitalize fs-4">Delivery Address</p>
 
          <Input
            title='Add Address'
            placeholder='Add a new delivery address'
            type='text'
            onChange={(e) => setAddress(e.target.value)}
          />

          <div className="mt-3">
            <MainBtn
              txt='Add Address'
              style='green-btn'
              action={handleSubmit}
              
            />
          <h4>Delivery Address: {deliveryAddress}</h4>
        <h4>Choose Address</h4>

        <div className="case-table card mt-4">
      <table className="table table-striped m-0">
        <thead>
          <tr className="text-capitalize">
            {tHead.map((e) => (
              <th scope="col">{e}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allAddresses
          .map((e) => (
            <tr className="text-capitalize">

    <th>{e}</th>
    
    <td className="py-3 text-align-center">
    <div className="d-flex flex-row">
    <button
      className={`green-txt mx-2 text-capitalize border-0 bg-transparent`}
        onClick={(s) =>{
          s.preventDefault();
          setDeliveryAddress(e)}
        } 
    >
      Select
    </button>
    </div>
    </td>   

    </tr>
          ))}
        </tbody>
      </table>
    </div>
{deliveryAddress &&
<div>
        <h4>Choose Payment Method</h4>
        <div>
            <input
            type='radio' name='payment' checked={type==='wallet'} value={'wallet'} onChange={(e) => {setType(e.target.value)}}/>
            Pay with wallet
        </div>
        <div>
            <input
            type='radio' name='payment' checked={type==='cash'} value={'cash'} onChange={(e) => {setType(e.target.value)}}/>
            Cash on delivery
        </div>
        <div>
            <input
            type='radio' name='payment' checked={type==='card'} value={'card'} onChange={(e) => {setType(e.target.value)}}/>
            Pay by card
        </div>

        </div>
        }
        {type==='card' &&
        <div>
        <Input
            title='Card Number'
            placeholder='Enter card number'
            type='text'
            required={true}

           onChange={(e) => setCardNumber(e.target.value)}
          />
          <Input
            title='Expiry Date'
            type='date'
            required={true}

           onChange={(e) => setCardDate(e.target.value)}
          />
          <Input
            title='CVV'
            placeholder='Enter CVV'
            type='text'
            required={true}
           onChange={(e) => setCardCVV(e.target.value)}
          />

            </div>
}

        </div>

        <h3>Submit Order</h3>
        <MainBtn
              txt='Submit Order'
              style='green-btn'
             action={handleSubmitOrder}
              
            />
      </div>
    </form>
    
   </div>
    )
}
export default Checkout;