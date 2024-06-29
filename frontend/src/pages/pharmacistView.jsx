import { Navigate, useNavigate, useParams } from "react-router-dom";
import MainBtn from "../components/Button";
import NavBarPharmacist from "../components/NavBarPharmacist";
import MedicineListPharmacist from "../components/medicineListPharmacist";
import axios from "axios";
import { useEffect, useState } from "react";
import TableNotifications from "../components/TableNotifications";


function PharmacistView(){
    const navigate = useNavigate();
    const {username} = useParams();
    const [notifications, setNotifications] = useState([]);
        
return (
    <div>
    <NavBarPharmacist username={username}/>
    <MedicineListPharmacist username={username}/>

    </div>
)
}
export default PharmacistView;