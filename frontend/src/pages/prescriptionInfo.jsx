import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import NavBarPatient from "../components/NavBarPatient";
import MainBtn from "../components/Button";
import Input from "../components/Input";
import TableCart from "../components/TableCart";
import TableMedicines from "../components/TableMedicines";


function PrescriptionInfo() {
  const {username, id } = useParams();
  const [result, setResult] = useState([]);
  const [cardNumber, setCardNumber] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [typePay, setTypePay] = useState('');


  useEffect(() => {
    const response = axios.get(`http://localhost:4000/Patient/viewPresDetails/${username}/${id}`, {
      headers: { authorization: "Bearer " + sessionStorage.getItem("token") },
    })
      .then(res => setResult(res.data)).catch(err => console.log(err))
  }, [])


console.log('el result ahooo', result)
  //   result.map((e) => {
  //     console.log(e)
  //   })
  let tHead = ['Name', 'Dose', 'Add to cart'];


  return (
    <div>
      <NavBarPatient username={result.PatientUsername} />
      <h2>Prescription Medicines</h2>
          {result.Medicines &&  <TableMedicines tHead={tHead} data={result.Medicines} username={result.PatientUsername}/>}

    </div>
  )
}
export default PrescriptionInfo;