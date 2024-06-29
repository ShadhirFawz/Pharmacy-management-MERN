import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import NavBarPharmacist from '../components/NavBarPharmacist.jsx';
import { useState } from 'react';
import Input from '../components/Input.jsx';
import MainBtn from '../components/Button.jsx';

function EditMedicine() {
  const { username, name } = useParams();
  const [activeIngredients, setActiveIngredients] = useState('');
  const [price, setPrice] = useState(0);
  const [picture, setPicture] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateIngredients = (e) => {
    e.preventDefault();
    const data = { ActiveIngredients: activeIngredients };

    axios.put(`http://localhost:8000/Pharmacist/UpdateMed/${username}/${name}`, data, {
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    })
      .then(res => {
        console.log(res.data);
        alert('Active Ingredients updated successfully');
        navigate(`/pharmacistView/${username}`);
      })
      .catch(err => console.log(err));
  }

  const updatePrice = (e) => {
    e.preventDefault();
    const data = { Price: price };

    axios.put(`http://localhost:8000/Pharmacist/UpdateMed/${username}/${name}`, data, {
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    })
      .then(res => {
        console.log(res.data);
        alert('Price updated successfully');
        navigate(`/pharmacistView/${username}`);
      })
      .catch(err => console.log(err));
  }

  const updatePicture = (e) => {
    e.preventDefault();
    const data = { Picture: picture };

    axios.put(`http://localhost:8000/Pharmacist/UpdateMed/${username}/${name}`, data, {
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    })
      .then(res => {
        console.log(res.data);
        alert('Medicine Image updated successfully');
        navigate(`/pharmacistView/${username}`);
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <NavBarPharmacist username={username}/>
      {/* <p className="text-capitalize fs-4">Edit Price</p> */}

      
      {/* <form>
        <h3>
          <input placeholder='active ingredients' type='text' onChange={(e) => setActiveIngredients(e.target.value)} />
          <button onClick={updateIngredients}>
            Update Active Ingredients</button>
        </h3>

        <h3>
          <input placeholder='price' type='text' onChange={(e) => setPrice(e.target.value)} />
          <button onClick={updatePrice}>
            Update Price</button>
        </h3>

        <h3>
          <input placeholder='medicine image URL' type="text" onChange={(e) => setPicture(e.target.value)} />
          <button onClick={updatePicture}>
            Update Medicine Image</button>
        </h3>
      </form> */}
      <form
        className="d-flex justify-content-center"
        onSubmit={updateIngredients}
      >
        <div style={{ width: '30%' }} className="form-width">
        <h1>Edit Medicine</h1>

          <Input
            title='Active Ingredients'
            required={true}
            placeholder='Enter active ingredients'
            type='text'
            onChange={(e) => setActiveIngredients(e.target.value)}
          />
          <div className="mt-3">
            <MainBtn
              txt='submit'
              type="submit"
              style='green-btn'
              //action={handleSubmit}

            />
          </div>
        </div>
      </form>
      <form
        className="d-flex justify-content-center"
        onSubmit={updatePrice}
      >
        <div style={{ width: '30%' }} className="form-width">
          <Input
            title='Price'
            required={true}
            placeholder='Enter new price'
            type='number'
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className="mt-3">
            <MainBtn
              txt='submit'
              type="submit"
              style='green-btn'
              //action={handleSubmit}

            />
          </div>
        </div>
      </form>
      <form
        className="d-flex justify-content-center"
        onSubmit={updatePicture}
      >
        <div style={{ width: '30%' }} className="form-width">
          <Input
            title='Medicine Picture'
            required={true}
            placeholder='Enter new medicine picture'
            type='text'
            onChange={(e) => setPicture(e.target.value)}
          />
          <div className="mt-3">
            <MainBtn
              txt='submit'
              type="submit"
              style='green-btn'
              //action={handleSubmit}

            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditMedicine;
