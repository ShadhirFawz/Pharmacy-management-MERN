import { useNavigate } from 'react-router-dom';


function CaseTableBody({ data, username }) {
  let navigate = useNavigate()

  return (
    <>
    {data.Name && <th>{data.Name}</th>}

    {data.ActiveIngredients && <td>{data.ActiveIngredients}</td>}
    {data.Price && <td>{data.Price}</td>}
    {data.Picture && <td> <img src = {data.Picture} alt='image' width={60} height={60}/> </td>}
    {data.MedicalUse && <td>{data.MedicalUse}</td>}
    {data.Quantity && <td>{data.Quantity}</td>}
    {data.Sales && <td>{data.Sales}</td>}
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

function TableAdmin({ tHead, data, searchText, filterText, username}) {
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
            return filterText.toLowerCase() === '' || filterText.toLowerCase() === 'all'?
            e : e.MedicalUse.toLowerCase() === filterText.toLowerCase()
          })
          .filter((e) => {
            return searchText.toLowerCase() === '' ? 
            e: e.Name.toLowerCase().includes(searchText.toLowerCase())
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

export default TableAdmin;
