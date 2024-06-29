import { useParams } from "react-router-dom";
import NavBarPatient from "../components/NavBarPatient";
import Table from '../components/Table.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import search from '../assets/images/svg/search.svg';

function PatientView(){
    const {username} = useParams();
    const[searchText, setSearchText] = useState('');
    const[filterText, setFilterText] = useState('');
    const[result, setResult] = useState([]);
    const[wallet, setWallet] = useState('');

    
    useEffect(() => {
  const response = axios.get(`http://localhost:8000/Patient/AvailableMedicinesDetailsByPatient/${username}`, {
    headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
  })
  .then(res =>setResult(res.data)).catch(err => console.log(err))
    }, [])
  console.log(result)
  result.map((e) => {
    console.log(e)
  })
  
  const onFilterValueChanged=(event)=>{
    setFilterText(event.target.value);
  }
  console.log(filterText)
  let navigate = useNavigate()
  
    let tHead = ['Name', 'Active Ingredients', 'Price', 'Photo', 'MedicalUse', 'Available', 'Add to Cart', 'Alternatives'];

return (
    <div>
    <NavBarPatient username={username}/>
    <div>
      {/* <Search onChange={(e) => setSearch(e.target.value)}/> */}
      <div className="d-flex justify-content-between flex-row">
      <p className="text-capitalize fs-4 w-25">Medicines</p>
      <div className="d-flex flex-row w-75 justify-content-end">
        <div className="input-group w-50">
          <span
            className="input-group-text bg-white border-end-0 search"
          >
            <img src={search} alt="search" />
          </span>
          <input
            type="text"
            className="form-control border-start-0 search ps-0"
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        {/* <button className="filter-btn ms-2 d-flex flex-row align-items-center">
          <img src={filter} className="me-2" alt="filter" />
          Filter
        </button> */}
        <select className="input-group-text bg-white border-end-0 search" name='medicalUse' onChange={onFilterValueChanged}>
        <option value='all'>All</option>
        <option value='pain Killer'>Pain killer</option>
        <option value='antiinflammatory'>Antiinflammatory</option>
        <option value='skincare'>Skincare</option>
        <option value='acne Cream'>Acne Cream</option>

        </select>
      </div>
    </div>
      <Table tHead={tHead} data={result} searchText={searchText} filterText={filterText} username={username}/>
    </div> 
   </div>
)
}
export default PatientView;