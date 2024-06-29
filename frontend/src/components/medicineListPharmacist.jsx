
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import search from '../assets/images/svg/search.svg';
import TablePharmacist from './TablePharmacist.jsx';
import MainBtn from './Button.jsx';

function MedicineListPharmacist(props) {
  const [searchText, setSearchText] = useState('');
  const [filterText, setFilterText] = useState('');
  const [result, setResult] = useState([]);
  const { username } = useParams();


  useEffect(() => {
    const response = axios.get(`http://localhost:8000/Pharmacist/AvailableMedicinesDetailsByPharmacist/${username}`, {
      headers: { authorization: "Bearer " + sessionStorage.getItem("token") },
    })
      .then(res => setResult(res.data)).catch(err => console.log(err))
  }, [])
  console.log(result)
  result.map((e) => {
    console.log(e)
  })

  const onFilterValueChanged = (event) => {
    setFilterText(event.target.value);
  }
  console.log(filterText)
  let navigate = useNavigate()

  let tHead = ['Name', 'Active Ingredients', 'Price', 'Photo', 'Medical Use', 'Quantity', 'Sales', 'Edit', 'archive/unarchive'];

  return (
    <div>
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

          <select className="input-group-text bg-white border-end-0 search" name='medicalUse' onChange={onFilterValueChanged} >
            <option value='all'>All</option>
            <option value='pain Killer'>Pain killer</option>
            <option value='antiinflammatory'>Antiinflammatory</option>
            <option value='skincare'>Skincare</option>
            <option value='acne cream'>Acne Cream</option>
            <option value='supplements'>Supplements</option>



          </select>

        </div>
        <div className="input-group w-25">
          <MainBtn
            txt="Add Medicine"
            style="green-btn"
            action={() => navigate(`/addMedicine/${username}`)}
            key="navBtn"
          />
        </div>
      </div>
      <TablePharmacist tHead={tHead} data={result} searchText={searchText} filterText={filterText} username={props.username} />
    </div>
  );
}
export default MedicineListPharmacist;
