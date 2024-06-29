import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableIAlternatives from './TableAlternatives';


function CaseTableBody({ data, username }) {
  let navigate = useNavigate()
  const[result, setResult] = useState([]);
  const handleAdd = async() => {
    try{
    const response = await axios.post(`http://localhost:8000/Patient/AddMedicineToCart/${username}/${data.Name}`, "", {
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    })
   // .then(res =>setResult(res)).catch(err => console.log(err))
      if (response.status === 200) {
            alert(response.data.message);
              console.log(response.data.message);
          }}
          catch(error ){
            alert(`Failed to add item `);
            console.error('Error adding item:', error);
          };
  }
  useEffect(() => {
    const response = axios.get(`http://localhost:8000/Patient/viewAlternatives/${username}/${data.Name}`, {
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    })
    .then(res =>setResult(res.data)).catch(err => console.log(err))
      }, [])
    console.log('alt', result)
  return (
    <>
      
    {!data.Name && <th>{data.Name}</th>}
    {!data.dosage && <th>{data.dosage}</th>}


    {/* {data.Quantity===0 && <td>Sold Out</td>}
    {data.Quantity>0 && <td>Available</td>} */}
    
      <td className="py-3 text-align-center">
      <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-capitalize border-0 bg-transparent`}
        onClick={handleAdd}
      >
        Add to cart
      </button>
      </div>
      </td>
      {/* { data.Quantity==0 && <td>Item Unavailable</td>}
      { data.Quantity==0 && <td><TableIAlternatives tHead={[]} data={result}/></td>} */}
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

function TablePresMedicines({ tHead, data, searchText, filterText, username}) {
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

export default TablePresMedicines;
