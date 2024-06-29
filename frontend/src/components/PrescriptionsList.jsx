import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import search from '../assets/images/svg/search.svg';
import TablePrescriptions from './TablePrescriptions.jsx'
import NavBarPatient from './NavBarPatient.jsx';



function PrescriptionsList() {
  const [searchText, setSearchText] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [filterText, setFilterText] = useState('');
  const [result, setResult] = useState([]);
  const { username } = useParams();


  useEffect(() => {
    const response = axios.get(`http://localhost:4000/Patient/viewAllMyPres/${username}`, {
      headers: { authorization: "Bearer " + sessionStorage.getItem("token") },
    })

      .then(res => setResult(res.data)).catch(err => console.log(err.request))
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

  let tHead = ['Doctor Username', 'Prescription Date', 'Description', 'Medicines'];

  return (
    <div>
      <NavBarPatient username={username} />
      {/* <Search onChange={(e) => setSearch(e.target.value)}/> */}
      <div className="d-flex justify-content-between flex-row">
        <p className="text-capitalize fs-4 w-25">Prescriptions</p>
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
              placeholder="Search by Doctor"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <input
              type="date"
              className="form-control border-start-0 search ps-0"
              placeholder="Search by date"
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </div>
          {/* <button className="filter-btn ms-2 d-flex flex-row align-items-center">
          <img src={filter} className="me-2" alt="filter" />
          Filter
        </button> */}
          <select className="input-group-text bg-white border-end-0 search" name='medicalUse' onChange={onFilterValueChanged}>
            <option value='all'>All</option>
            <option value='filled'>Filled</option>
            <option value='unfilled'>Unfilled</option>
          </select>
        </div>
      </div>
      <TablePrescriptions tHead={tHead} data={result} searchText={searchText} searchDate={searchDate} filterText={filterText} username={username}/>
    </div>
  );
}
export default PrescriptionsList;
