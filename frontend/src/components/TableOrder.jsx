import { useNavigate } from 'react-router-dom';
import TableItems from './TableItems';
import { useState } from 'react';
import axios from 'axios';
import MainBtn from './Button';


function CaseTableBody({ data, username }) {
  let navigate = useNavigate()
  const[resultCancel, setResultCancel] = useState('');

  const handleCancel = async(id) => {

      const response = axios.put(`http://localhost:8000/Patient/CancelOrder/${id}`,"",{
        headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
      })
       .then(res =>setResultCancel(res)).catch(err => console.log(err))
      console.log('result cancel',resultCancel);
          window.location.reload(true);        
      }
  return (
    <>
    <th>{data._id}</th>
    <td>{data.PaymentMethod}</td>
    <td>{data.Status}</td>
    <td>{data.TotalAmount}</td>
    <td>{data.ShippingAddress}</td>
    <td><TableItems tHead={['Medicine Name', 'Quantity']} data={data.Items}/></td>
    <td className="py-3 text-align-center">
      {data.Status != 'Cancelled' &&
      <div className="d-flex flex-row">
      <MainBtn
              txt="Cancel Order"
              style="white-btn"
              action={()=>handleCancel(data._id)}
              key="navBtn"
            />
      </div>
}
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

function TableOrder({ tHead, data, username}) {
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
                <CaseTableBody data={e} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableOrder;
