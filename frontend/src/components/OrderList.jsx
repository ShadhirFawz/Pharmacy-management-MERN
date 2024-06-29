import Search from './Search.jsx';
import Table from './Table.jsx';
import { useNavigate , useParams} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import search from '../assets/images/svg/search.svg';
import filter from '../assets/images/svg/filter.svg';
import MedicineView from '../pages/medicineView.jsx';
import NavBar from './NavBar.jsx';
import TableOrder from './TableOrder.jsx';


function OrderList() {
  const[searchText, setSearchText] = useState('');
  const[filterText, setFilterText] = useState('');
  const[result, setResult] = useState([]);
  const {username} = useParams();


  useEffect(() => {
const response = axios.get(`http://localhost:8000/Patient/GetOrderDetails/${username}`, {
  headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
})
.then(res =>setResult(res.data)).catch(err => console.log(err))
  }, [])
console.log(result)
result.map((e) => {
  console.log(e)
})

console.log(filterText)
let navigate = useNavigate()

  let tHead = ['Name', 'Active Ingredients', 'Price', 'Photo', 'MedicalUse', 'Amount'];

  return (
    <div>
      
      <TableOrder tHead={tHead} data={result} searchText={searchText} filterText={filterText}/>
    </div>
  );
}
export default OrderList;
