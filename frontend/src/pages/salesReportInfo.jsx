import { useState, useEffect } from "react";
import NavBarAdministrator from "../components/NavBarAdministrator";
import { useParams} from 'react-router-dom';
import axios from "axios";
import search from '../assets/images/svg/search.svg';
import NavBarPharmacist from "../components/NavBarPharmacist";
import TableSalesReport from "../components/TableSalesReport";

function SalesReportInfo(){
    const {username, type} = useParams();
    const[result, setResult] = useState([]);
    const[filterText, setFilterText] = useState('all');
    const[searchText, setSearchText] = useState('');
    const[searchDate, setSearchDate] = useState('');


//     useEffect(() => {
//   const response = axios.get(`http://localhost:8000/Admin/viewSalesReportOnChosenMonth/${username}/${filterText}`,{
//     headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
//   })
//   .then(res =>setResult(res.data)).catch(err => console.log(err))
//     }, [])

  const viewSales = (e) => {
    setFilterText(e);
     axios.get(`http://localhost:8000/Pharmacist/viewSalesReportOnChosenMonth/${username}/${e}`,{
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    })
    .then(res =>setResult(res.data.medicineSales)).catch(err => console.log(err))
  }
  
  console.log('sales', result)

let tHead = ['Medicine Name', 'Date', 'Total'];

return (
    <div>
        {type==='admin' &&
        <NavBarAdministrator username={username}/>
        }
        {type==='pharmacist' &&
        <NavBarPharmacist username={username}/>
        }
        <select name='month' onChange={(e) => viewSales(e.target.value)}>
        <option value='all'>All</option>
        <option value='January'>January</option>
        <option value='February'>February</option>
        <option value='March'>March</option>
        <option value='April'>April</option>
        <option value='May'>May</option>
        <option value='June'>June</option>
        <option value='July'>July</option>
        <option value='August'>August</option>
        <option value='September'>September</option>
        <option value='October'>October</option>
        <option value='november'>November</option>
        <option value='December'>December</option>
        </select>
        {filterText && filterText!="all" &&
        <div>
            <div className="d-flex justify-content-between flex-row">
      <p className="text-capitalize fs-4 w-25">{filterText} Sales Report</p>
      <div className="d-flex flex-row w-75 justify-content-end">
        <div className="input-group w-50">
        <input
            type="date"
            className="form-control border-start-0 search ps-0"
            placeholder="Filter by date"
            onChange={(e) => setSearchDate(e.target.value)}
          />
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
      </div>
    </div>
        <TableSalesReport tHead={tHead} data={result} searchText={searchText} searchDate={searchDate}/>
        </div>
        }
        </div>
)
}
export default SalesReportInfo;