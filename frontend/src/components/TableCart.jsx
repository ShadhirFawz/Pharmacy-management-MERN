import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function CaseTableBody({ data, username }) {
  let navigate = useNavigate();
  const [newQuantity, setNewQuantity] = useState(data.quantity);
  const [maxQuantity, setMaxQuantity] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:8000/Patient/getMedicineByName/${data.medicine}/${username}`,{
     headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
   })
   .then(res =>setMaxQuantity(res.data.Quantity)).catch(err => console.log(err))
 }, []);

 console.log('maxx', maxQuantity);
  const handleRemove = async() => {
    try{
    const response = await axios.delete(`http://localhost:8000/Patient/removeItemFromCart/${username}/${data.medicine}`, {
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    })
   // .then(res =>setResult(res)).catch(err => console.log(err))
      if (response.status === 200) {
            alert(response.data.message);
              console.log(response.data.message);
          }}
          catch(error ){
            alert(`Failed to remove item `);
            console.error('Error removing item:', error);
          };
          window.location.reload(true);        
      }
      // useEffect(() => {
      //    axios.put(`http://localhost:8000/Patient/updateQuantity/${username}/${data.medicine}/${newQuantity}`,"",{
      //     headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
      //   })
      //   .then(res =>console.log(res)).catch(err => console.log(err))

      // }, [newQuantity]);

      // const handleQuantityAdd = async() => {
      //   try{
      //     //const newQuantity = data.quantity+1;
      //     setNewQuantity(data.quantity+1);
      //   const response = await axios.put(`http://localhost:8000/Patient/updateQuantity/${username}/${data.medicine}/${newQuantity}`,"",{
      //     headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
      //   })
      //  // .then(res =>setResult(res)).catch(err => console.log(err))
      //     if (response.status === 200) {
      //           //alert(response.data.message);
      //             console.log(response.data.message);
      //         }}
      //         catch(error ){
      //           alert(`Failed to add item `);
      //           console.error('Error removing item:', error);
      //         };
      //         //window.location.reload(true);        
      //     }
      //     const handleQuantityRemove = async() => {
      //       if(data.quantity>1){
      //         setNewQuantity(data.quantity-1);
      //       try{
      //       const response = await axios.put(`http://localhost:8000/Patient/updateQuantity/${username}/${data.medicine}/${newQuantity}`, "", {
      //         headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
      //       }) 
      //       if (response.status === 200) {
      //         //alert(response.data.message);
      //           console.log(response.data.message);
      //       }}
      //       catch(error ){
      //         alert(`Failed to remove item `);
      //         console.error('Error removing item:', error);
      //       };
      //       //window.location.reload(true);    
      //     }
      //     else{
      //       try{
      //         const response = await axios.delete(`http://localhost:8000/Patient/removeItemFromCart/${username}/${data.medicine}`, {
      //           headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
      //         })
      //         if (response.status === 200) {
      //           alert(response.data.message);
      //             console.log(response.data.message);
      //         }}
      //         catch(error ){
      //           alert(`Failed to remove item `);
      //           console.error('Error removing item:', error);
      //         };
      //         window.location.reload(true);
      //     }           
      //         }
      const handleQuantityRemove =() => {
        if(newQuantity>1){
        setNewQuantity(newQuantity-1) ;
        axios.put(`http://localhost:8000/Patient/updateQuantity/${username}/${data.medicine}/${newQuantity}`,"",{
          headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
        })
        .then(res =>setNewQuantity(newQuantity-1)).catch(err => console.log(err))
      }
    }
      const handleQuantityAdd =() => {
        axios.put(`http://localhost:8000/Patient/updateQuantity/${username}/${data.medicine}/${newQuantity}`,"",{
          headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
        })
        .then(res =>setNewQuantity(newQuantity+1)).catch(err => console.log(err))
        
      }
            
  return (
    <>
    <th>{data.medicine}</th>

    <td>
    <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-capitalize border-0 bg-transparent`}
        onClick={handleQuantityAdd}
      >
        +
      </button>
      {newQuantity}
      <button
        className={`green-txt mx-2 text-capitalize border-0 bg-transparent`}
        onClick={handleQuantityRemove}
      >
        -
      </button>
      </div>
      
    </td>

      <td className="py-3 text-align-center">
      <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-capitalize border-0 bg-transparent`}
        onClick={handleRemove}
      >
        Remove
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

function TableCart({ tHead, data, username }) {
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

export default TableCart;
