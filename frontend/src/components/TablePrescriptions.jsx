import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CaseTableBody({ data, username }) {
  let navigate = useNavigate()
  console.log("pres id", data.PatientUsername)

  return (
    <>

      {!data.Filled && data.DoctorUsername && <th>{data.DoctorUsername}</th>}
      {!data.Filled && data.Date && <td>{data.Date.substring(0, 10)}</td>}
      {!data.Filled && data.Description && <td>{data.Description}</td>}


      <td className="py-3 text-align-center">
        <div className="d-flex flex-row">
          <button
            className={`green-txt mx-2 text-capitalize border-0 bg-transparent`}
            onClick={() => navigate(`/prescriptionInfo/${username}/${data.prescriptionID}`)}
          >
            Medicines
          </button>
        </div>
      </td>


    </>
  );
}

// function NoramlTableBody({ data }) {
//   let arr = [];
//   for (let key in data) arr.push(data[key]);

//   return (
//     <>
//       {arr.map((e) => (
//         <td>{e}</td>
//       ))}
//     </>
//   );
// }

function TablePrescriptions({ tHead, data, searchText, filterText, searchDate, username }) {
  console.log("fff", filterText.toLowerCase())
  return (
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
          {data
            .filter((e) => {
              return filterText === '' || filterText.toLowerCase() === 'all' ?
                e : filterText.toLowerCase() === 'filled' ? e.Filled : !e.Filled
            })
            .filter((e) => {
              return searchText === '' ?
                e : e.DoctorUsername.toLowerCase().includes(searchText.toLowerCase())
            })
            .filter((e) => {
              return searchDate === '' ?
                e : e.Date.substring(0, 10) === searchDate
            })
            .map((e) => (
              <tr className="text-capitalize">
                <CaseTableBody data={e} username={username}/>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablePrescriptions;
