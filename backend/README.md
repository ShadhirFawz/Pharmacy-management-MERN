
# El7a2ny: Virtual Clinic and Pharmacy

The primary objective of the project is to establish a comprehensive online clinic that caters to the needs of both patients and the clinic itself, complete with a pharmacy. El7a2ny is a software program designed to let patients, medical professionals, chemists, and clinics all work together more efficiently and automatically. This encompasses features such as finding a suitable a doctor, making appointments, holding in-person or virtual meetings, obtaining prescriptions, receiving follow-up reminders, accessing medical records, and placing prescription drug orders.


## Motivation
Our motivation to develop El7a2ny is rooted in a shared commitment to elevate and refine healthcare processes. We envision a future where healthcare transcends traditional boundaries, and our project is the catalyst for this transformation.

**Revolutionizing Healthcare Accessibility:** Our passion lies in breaking down barriers to healthcare. Picture a world where finding the right doctor, setting up appointments, and managing prescriptions are just a few clicks away. We're committed to making healthcare not just a service but an experience that's effortlessly within reach.

**Empowering Personalized Care:** At the heart of our project is the belief that healthcare should be as unique as the individuals it serves. With our platform, you're not just a patient; you're an active participant in your health journey. Access your medical history, set personalized reminders, and take control of your well-being on your terms.

**Simplifying Professional Workflows:** For healthcare professionals, we're on a mission to simplify the complexities of daily tasks. By automating administrative processes, we aim to give doctors, pharmacists, and clinics more time to focus on what they do best – providing attentive and quality care to their patients.

**Catalyzing Seamless Communication:** In our vision, communication isn't just a transaction; it's the heartbeat of healthcare. We're building a platform that facilitates transparent and instantaneous communication between patients and healthcare providers, fostering a sense of connection that goes beyond traditional medical interactions.
## Build Status
Some pages in the website face a longer time loading than others , which can be confusing sometimes for no data , but we tried fixing it by adding a "Loading" statements all over the website so the user does not get confused that the page stopped loading , also The "change password" has to work on 
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
})); (something specific) but we can’t do that as sometimes we run the frontend on a different port so we need to use
app.use(cors({
  origin: ‘*’,
  credentials: true,
}));
## Code Style
### **Project Hierarchy**

#### **1. Backend**

**Controllers:** Contains controllers handling various the business logic -- optimizing online healthcare interactions, streamlining appointments, prescriptions, and medical records for enhanced accessibility and personalized care.

**Models:** Houses database models and schemas that define the structure and relationships of its data entities.

**Middleware:** Holds middleware functions used in the application, i.e., jsonwebtoken is used for logging in and multer for document uploads.

**Routes:** Establishes pathways for handling various HTTP requests, specifying endpoints and connecting them to their respective controllers 

**App:** Entry point for the backend application.

**Utils:** Verifies the uniqueness of emails and usernames, and validates passwords.

___

#### **2. Frontend**

**Assets:** Stores static assets and visual elements such as images, fonts, etc.

**Components:** Houses reusable React components such as lists, tables, forms and navigation bars.

**Features:** Contains feature-specific components and logic.

**Pages:** Defines different pages of the application such as different medical professionals' views registration pages.

**App:** Entry point for the frontend application.
___

### Backend Code Style
The backend code follows a clean and organized structure with clear separation of concerns. Notable points include:

**Async/Await Usage:** The code consistently uses async/await for handling asynchronous operations, enhancing code readability.

**Error Handling:** Robust error handling is implemented using try-catch blocks, providing clear responses to potential issues.

**Consistent Naming:** Variable and function names are in camelCase, adhering to common JavaScript conventions.

**Comments:** The code includes comments for explaining complex logic and providing context, aiding in understanding.
___

### Frontend Code Style
The frontend code, written in React, also follows a structured and readable style:

**Component Structure:** Components are well-organized into directories based on their functionality, promoting maintainability.

**State Management:** React state is managed using the useState hook, contributing to a more functional and modular approach.

**Effect Handling:** Managing side effects in React using the useEffect hook, fostering a more functional and modular approach to handling asynchronous operations and lifecycle events.

**External Dependencies:** External dependencies, such as Axios for HTTP requests, are imported and used consistently.

**Consistent Styling:** Consistent styling practices are followed, and class names are indicative of their purpose.
## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Tech Stack
El7a2ny utilizes the MERN stack, comprising MongoDB, Express.js, React, and Node.js, to create a robust and full-stack web application. This technology stack seamlessly integrates a NoSQL database, a server-side framework, a front-end framework, and a runtime environment, providing a comprehensive solution for building scalable and dynamic web applications.

**Client:** React and Axios

**Server:** Node, Express and MongoDB
## Features
In our application, we prioritize user experience by seamlessly integrating a variety of micro enhancements. From animated transitions and tooltip guidance for intuitive navigation to smart form validation and contextual feedback for user assistance, each detail is meticulously designed. These subtle yet impactful features, such as responsive design and persistent user preferences, collectively contribute to an enhanced, efficient, and personalized experience, ensuring our users engage with our application effortlessly and enjoy a heightened level of satisfaction.

**Soothing Color Palette:** Our project features a carefully curated color scheme primarily centered around calming shades of blue and cream. Leveraging the principles of color psychology, the choice of blue invokes a sense of tranquility and professionalism.

**Sectionalized Architecture:** Implemented with meticulous precision, the project embodies a robust architecture with well-defined sections, ensuring intuitive navigation and seamless user engagement.

**Optimized Visibility Mechanisms:** Prioritizing clarity, our project incorporates advanced visibility features, guaranteeing optimal information presentation for users.

**Visual Equilibrium:** A focus on visual balance is integral to our design philosophy, resulting in a harmonious layout that contributes to an aesthetically pleasing and user-centric interface.

**Fill Screen Mode:** Enhancing user flexibility, our application includes a fill screen mode, allowing users to maximize their viewing experience and immerse themselves in content.

**Cross-Platform Compatibility:** Our project is designed to be seamlessly accessible across various platforms, ensuring a consistent and user-friendly experience regardless of the device or OS being used.
## Code Examples
### Server
#### Patient Controller Function:
    // Search for medicine by name
    const getMedicineByName = async (req, res) => {
    const { Name, Username } = req.params;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (!(req.user.Username === Username)) {
        res.status(403).json("You are not logged in!");
    } else {
            try {
            const info = await Medicine.findOne({ Name: Name }, { _id: 0, ActiveIngredients: 0, Price: 0, Picture: 0, MedicalUse: 0 });
            if (!info) {
                return res.status(400).json({ error: "This medicine does not exist!" })
            }
            res.status(200).json(info);
            } catch (error) {
            res.status(500).json({ error: "Server error", details: error.message });
            }
        }
    }

#### Multer Middleware:
    const express = require('express');
    const multer = require('multer');
    const path = require('path');
    const storage = multer.memoryStorage();
    const allowedFileTypes = ['pdf', 'jpeg', 'jpg', 'png'];
    const fileFilter = (req, file, cb) => {
    const extname = path.extname(file.originalname).toLowerCase();

    if (allowedFileTypes.includes(extname.substr(1))) {
        return cb(null, true);
    }
    return cb(new Error('Invalid file type. Only PDF, JPEG, JPG, and PNG files are allowed.'));
    };

    const upload = multer({
        storage: storage,
        fileFilter: fileFilter,
    });

    module.exports = upload;

#### Pharmacist Model:
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const pharmacistSchema = new Schema({
    Username: {
        type: String,
        required: true,
        unique: true
    },
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    DateOfBirth: {
        type: Date,
        required: true
    },
    HourlyRate: {
        type: Number,
        required: true
    },
    Affiliation: {
        type: String,
        required: true
    },
    EducationalBackground: {
        type: String,
        required: true
    },
    IDDocument: {
        data: {
        type: Buffer,
        },
        contentType: {
        type: String,
        },
    },
    PharmacyDegreeDocument: {
        data: {
        type: Buffer,
        },
        contentType: {
        type: String,
        },
    },
    WorkingLicenseDocument: {
        data: {
        type: Buffer,
        },
        contentType: {
        type: String,
        },
    },
    WalletAmount: {
        type: Number,
        default: 0
    },
    }, { timestamps: true });

    const Pharmacist = mongoose.model('Pharmacist', pharmacistSchema);
    module.exports = Pharmacist;

#### Patient Feature Route:
    router.get('/getPatientWalletAmount/:Username', verify, getPatientWalletAmount);

#### Utility Function to Check the Uniqueness of a Username in the Database:
    async function isUsernameUnique(username) {
    const patientExists = await Patient.findOne({ Username: username });
    const guestDoctorExists = await GuestDoctor.findOne({ Username: username });
    const doctorExists = await Doctor.findOne({ Username: username });
    const adminExists = await Admin.findOne({ Username: username });
    return !patientExists && !guestDoctorExists && !adminExists && !doctorExists;
    }
___

### Client
#### Colors (Assets):
    :root {
    --mint-geen: #067787;
    --ligth-grey: #f5f5f5;
    --dark-grey: #404040;
    --red: #e50c0c;
    }

    .green-btn {
    background-color: var(--mint-geen);
    color: white;
    }

    .white-btn {
    background-color: var(--ligth-grey);
    color: red;
    }

    .grey-btn {
    background-color: var(--ligth-grey);
    color: var(--mint-geen);
    }

    .green-txt {
    color: var(--mint-geen);
    }

    .red-txt {
    color: var(--red);
    }

    .dark-grey-txt {
    color: var(--dark-grey);
    }

    .err-active {
    border-color: var(--red);
    }

    .bg-green {
    background-color: #e1eff1;
    }

    .bg-grey {
    background-color: var(--ligth-grey);
    }

    
#### Pharmacists' Medicine List Component:
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


#### Login Page
    import { useNavigate } from "react-router-dom";
    import Input from "../components/Input.jsx";
    import MainBtn from "../components/Button.jsx";
    import { Link } from "react-router-dom";
    import { useState } from "react";
    import axios from "axios";
    import {jwtDecode} from "jwt-decode";


    function Login() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);

    const refreshToken = async () => {
        try {
        const res = await axios.post("/refresh", { token: user.refreshToken });
        setUser({
            ...user,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
        });
        return res.data;
        } catch (err) {
        console.log(err);
        }
    };

    const axiosJWT = axios.create()

    axiosJWT.interceptors.request.use(
        async (config) => {
        let currentDate = new Date();
        const decodedToken = jwtDecode(user.accessToken);
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            const data = await refreshToken();
            config.headers["authorization"] = "Bearer " + data.accessToken;
        }
        return config;
        },
        (error) => {
        return Promise.reject(error);
        }
    );

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
        const response = await axios.post("http://localhost:8000/login", {
            username: username,
            password: password,
        });
        console.log(response.data);
        if (response.data.userPatient) {
            sessionStorage.setItem("token", response.data.userPatient.accessToken);
            navigate(`/patientView/${username}`);
        } else if (response.data.userpharmacist) {
            sessionStorage.setItem("token", response.data.userpharmacist.accessToken);
            navigate(`/pharmacistView/${username}`);
        } else if (response.data.userAdmin) {
            sessionStorage.setItem("token", response.data.userAdmin.accessToken);
            navigate(`/administratorView/${username}`);
        } else {
            console.error("User role not recognized");
            alert("User role not recognized");
        }
        console.log(sessionStorage);
        } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        alert(error.response ? error.response.data.error : error.message);
        }
    };

    return (
        <div>
            <form className="d-flex justify-content-center">
                <div className="form-width">
                <p className="text-capitalize fs-4">Login</p>

                <Input
                    title="username"
                    placeholder="enter your username"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    title="password"
                    placeholder="enter your password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="mt-3">
                    <MainBtn
                    txt="login"
                    style="green-btn"
                    action={handleLogin}
                    />
                </div>

                <p className="text-center mt-3 small-txt">
                    <>
                    Forgot Password?
                    <Link to="/forgotpassword" className="green-txt">
                        {" "}
                        Reset Password
                    </Link>
                    </>
                </p>
                </div>
            </form>
            </div>
        );
    }
    export default Login;

#### Routes in App:
    import EditMedicine from './pages/editMedicine';
    <Route exact path="/editMedicine/:name/:username" element={<EditMedicine />} />
## Installation

Install my-project with npm:

```bash
  npm install my-project
  cd my-project
```
Install the following npm packages:

    1. axios -- npm i axios
    2. bcrypt -- npm i bcrypt
    3. body-parser -- npm i body-parser
    4. connect -- npm i connect
    5. cookie-parser -- npm i cookie-parser
    6. cors -- npm i cors
    7. dotenv -- npm i dotenv
    8. express -- npm i express
    9. git -- npm i git
    10. jsonwebtoken -- npm i jsonwebtoken
    11. moment -- npm i moment
    12. mongoose -- npm i mongoose
    13. multer -- npm i multer
    14. node -- npm i node
    15. nodemailer -- npm i nodemailer
    16. nodemon -- npm i nodemon
    17. pdfkit -- npm i pdfkit
    18. react -- npm i react
    19. stripe -- npm i stripe
    20. validator -- npm i validator

Install the following apps:

    1. MongoDB (Atlas)
    2. Postman
    3. Visual Studio Code
## API Reference

### Admin Routes

#### Add Admin

    POST /Admin/AddAdmin/:username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. The username of the admin to be added. |

#### Add Pharmacist

    POST /Admin/AddPharmacist/:username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. The username of the pharmacist to be added. |

#### Remove Patient or Pharmacist

    DELETE /Admin/RemovePatientOrPharmacist/:username/:Username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. The username of the admin performing the removal. |
| `Username` | `string` | **Required**. The username of the patient or pharmacist to be removed. |

#### Infos of a Pharmacist Request

    GET /Admin/InfosOfAPharmacistRequest/:username/:Username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. The username of the admin retrieving information. |
| `Username` | `string` | **Required**. The username of the pharmacist whose request info is requested. |

#### Infos of Requests by Pharmacist

    GET /Admin/InfosOfRequestsByPharmacist/:username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. The username of the pharmacist retrieving information. |

#### Available Medicines Details by Admin

    GET /Admin/AvailableMedicinesDetailsByAdmin/:username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. The username of the admin retrieving medicine details. |

#### Pharmacist Info

    GET /Admin/PharmacistInfo/:username/:Username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. The username of the admin retrieving pharmacist information. |
| `Username` | `string` | **Required**. The username of the pharmacist whose information is requested. |

#### All Pharmacists

    GET /Admin/AllPharmacists/:username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. The username of the admin retrieving all pharmacists. |

#### All Patients

    GET /Admin/AllPatients/:username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. The username of the admin retrieving all patients. |

#### Patient Info

    GET /Admin/PatientInfo/:username/:Username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. The username of the admin retrieving patient information. |
| `Username` | `string` | **Required**. The username of the patient whose information is requested. |

#### Medicine by Name

    GET /Admin/MedicineByName/:username/:Name

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. The username of the admin retrieving medicine information. |
| `Name` | `string` | **Required**. The name of the medicine to be retrieved. |

#### Medicine by Medical Use

    GET /Admin/MedicineByMedicalUse/:username/:MedicalUse

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. The username of the admin retrieving medicine information. |
| `MedicalUse` | `string` | **Required**. The medical use for which medicines are to be retrieved. |

#### Accept or Reject Pharmacist Request

    POST /Admin/AcceptOrRejectPharmacistRequest/:username/:Username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. The username of the admin performing the action. |
| `Username` | `string` | **Required**. The username of the pharmacist whose request is being accepted or rejected. |

___

### Guest Routes

#### Register Patient (Guest)

    POST /Guest/RegisterPatient

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| - | - | This request does not require additional parameters. |

#### Submit Request to Be Pharmacist (Guest)

    POST /Guest/SubmitRequestToBePharmacist

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `IDDocument` | `file` | **Required**. ID document file for the pharmacist registration. |
| `PharmacyDegreeDocument` | `file` | **Required**. Pharmacy degree document file for the pharmacist registration. |
| `WorkingLicenseDocument` | `file` | **Required**. Working license document file for the pharmacist registration. |

___

### Patient Routes

#### Available Medicines Details By Patient

    GET /Patient/AvailableMedicinesDetailsByPatient/:Username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the patient retrieving medicine details. |

#### Medicine By Name

    GET /Patient/MedicineByName/:Username/:Name

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the patient retrieving medicine information. |
| `Name` | `string` | **Required**. The name of the medicine to be retrieved. |

#### Medicine By Medical Use

    GET /Patient/MedicineByMedicalUse/:Username/:MedicalUse

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the patient retrieving medicine information. |
| `MedicalUse` | `string` | **Required**. The medical use for which medicines are to be retrieved. |

#### Add Address To Patient

    POST /Patient/AddAddressToPatient/:Username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the patient adding an address. |

#### Get Patient Addresses

    GET /Patient/GetPatientAddresses/:Username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the patient retrieving addresses. |

#### Get Order Details

    GET /Patient/GetOrderDetails/:Username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the patient retrieving order details. |

#### Cancel Order

    PUT /Patient/CancelOrder/:orderId

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `orderId` | `string` | **Required**. The ID of the order to be canceled. |

#### View Cart Items

    GET /Patient/viewCartItems/:Username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the patient viewing cart items. |

#### Remove Item From Cart

    DELETE /Patient/removeItemFromCart/:Username/:MedicineName

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the patient removing an item from the cart. |
| `MedicineName` | `string` | **Required**. The name of the medicine to be removed from the cart. |

#### Add Medicine To Cart

    POST /Patient/addMedicineToCart/:Username/:MedicineName

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the patient adding a medicine to the cart. |
| `MedicineName` | `string` | **Required**. The name of the medicine to be added to the cart. |

#### Update Quantity In Cart

    PUT /Patient/updateQuantity/:Username/:MedicineName/:quantity

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the patient updating the quantity. |
| `MedicineName` | `string` | **Required**. The name of the medicine in the cart. |
| `quantity` | `number` | **Required**. The new quantity of the medicine in the cart. |

#### Checkout Order

    POST /Patient/checkoutOrder/:Username/:paymentMethod/:ShippingAddress

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the patient checking out the order. |
| `paymentMethod` | `string` | **Required**. The payment method for the order. |
| `ShippingAddress` | `string` | **Required**. The shipping address for the order. |

#### View Alternatives

    GET /Patient/viewAlternatives/:Username/:medicineName

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the patient viewing alternatives. |
| `medicineName` | `string` | **Required**. The name of the medicine for which alternatives are to be retrieved. |

#### Get Patient Wallet Amount

    GET /Patient/getPatientWalletAmount/:Username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the patient retrieving wallet amount. |

#### Get All Orders

    GET /Patient/getAllOrders/:Username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the patient retrieving all orders. |

#### Get Medicines From Unfilled Prescriptions

    GET /Patient/getMedicinesFromUnfilledPrescriptions/:Username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the patient retrieving medicines from unfilled prescriptions. |

#### Add Prescription Medicine To Cart

    POST /Patient/addPrescriptionMedicineToCart/:Username/:MedicineName

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the patient adding a prescription medicine to the cart. |
| `MedicineName` | `string` | **Required**. The name of the prescription medicine to be added to the cart. |

___

### Pharmacist Routes

#### Available Medicines Details By Pharmacist

    GET /Pharmacist/AvailableMedicinesDetailsByPharmacist/:Username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the pharmacist retrieving medicine details. |

#### Available Medicines Quantity

    GET /Pharmacist/AvailableMedicinesQuantity/:Username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the pharmacist retrieving available medicines quantity. |

#### Medicine Quantity and Sales

    GET /Pharmacist/MedQuantityAndSales/:Username/:Name

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the pharmacist retrieving medicine quantity and sales. |
| `Name` | `string` | **Required**. The name of the medicine. |

#### Add Medicine

    POST /Pharmacist/AddMedicine/:Username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the pharmacist adding a new medicine. |
| `Picture` | `file` | **Required**. The picture file of the medicine. |

#### Update Medicine

    PUT /Pharmacist/UpdateMed/:Username/:Name

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the pharmacist updating the medicine. |
| `Name` | `string` | **Required**. The name of the medicine to be updated. |
| `Picture` | `file` | **Required**. The updated picture file of the medicine. |

#### Medicine By Name

    GET /Pharmacist/MedicineByName/:Username/:Name

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the pharmacist retrieving medicine information. |
| `Name` | `string` | **Required**. The name of the medicine to be retrieved. |

#### Medicine By Medical Use

    GET /Pharmacist/MedicineByMedicalUse/:Username/:MedicalUse

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the pharmacist retrieving medicine information. |
| `MedicalUse` | `string` | **Required**. The medical use for which medicines are to be retrieved. |

#### Check Medicine Quantity Notification

    POST /Pharmacist/CheckMedicineQuantityNotification/:Username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the pharmacist checking medicine quantity notification. |

#### Delete Notification If Quantity Not Zero

    POST /Pharmacist/deleteNotificationIfQuantityNotZero/:Username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the pharmacist deleting notification if quantity is not zero. |

#### Archive Medicine

    PUT /Pharmacist/archiveMedicine/:Username/:medicineName

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the pharmacist archiving a medicine. |
| `medicineName` | `string` | **Required**. The name of the medicine to be archived. |

#### Unarchive Medicine

    PUT /Pharmacist/unarchiveMedicine/:Username/:medicineName

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the pharmacist unarchiving a medicine. |
| `medicineName` | `string` | **Required**. The name of the medicine to be unarchived. |

#### View Sales Report on Chosen Month

    GET /Pharmacist/viewSalesReportOnChosenMonth/:Username/:chosenMonth

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the pharmacist viewing sales report for the chosen month. |
| `chosenMonth` | `string` | **Required**. The chosen month for the sales report. |

#### View Sales Report on Medicine

    GET /Pharmacist/viewSalesReportOnMedicine/:Username/:medicineName

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the pharmacist viewing sales report for a specific medicine. |
| `medicineName` | `string` | **Required**. The name of the medicine for the sales report. |

#### View Sales Report on Date

    GET /Pharmacist/viewSalesReportOnDate/:Username/:date

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the pharmacist viewing sales report for a specific date. |
| `date` | `string` | **Required**. The date for the sales report. |

#### Check Medicine Quantity Notification (Alternative Route)

    POST /Pharmacist/CheckMedicineQuantityNotification/:Username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the pharmacist checking medicine quantity notification. |

#### Delete Notification If Quantity Not Zero (Alternative Route)

    POST /Pharmacist/deleteNotificationIfQuantityNotZero/:Username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the pharmacist deleting notification if quantity is not zero. |

#### Display Notifications

    GET /Pharmacist/displayNotifications/:Username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the pharmacist displaying notifications. |

#### Get Pharmacist Wallet Amount

    GET /Pharmacist/getPharmacistWalletAmount/:Username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the pharmacist retrieving wallet amount. |

#### Update Pharmacist Salary

    PUT /Pharmacist/updatePharmacistSalary/:Username/:hoursWorked

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required**. The username of the pharmacist updating salary. |
| `hoursWorked` | `number` | **Required**. The number of hours worked for updating the salary. |

___

### Doctor from Clinic Routes

#### Get Medicine By Doctor (DoctorFromTheClinic)

    GET /DoctorFromTheClinic/GetMedicineByDoctor/:Name

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Name` | `string` | **Required**. The name of the doctor for which medicines are to be retrieved. |

#### Get All Medicines (DoctorFromTheClinic)

    GET /DoctorFromTheClinic/GetAllMedicines/:DoctorUsername

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `DoctorUsername` | `string` | **Required**. The name of the doctor retrieving the medicines. |


___

### General Routes

#### Refresh Token

    POST /refresh

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| - | - | This request does not require additional parameters. |

#### User Login

    POST /login

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| - | - | This request requires appropriate credentials for user login. |

#### User Logout

    POST /logout/:username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. The username of the user to be logged out. |

#### Send OTP for Password Reset

    POST /OtpResetPassword

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| - | - | This request requires appropriate information for sending OTP for password reset. |

#### Update Password (Forgot Password)

    POST /UpdatePassword

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| - | - | This request requires appropriate information for updating the password (forgot password). |

#### Change Password

    PUT /ChangePassword/:username

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. The username of the user changing the password. |

## Tests
### Testing with Postman
#### 1. Login to Obtain Access Token
    1. Make a POST request to the login endpoint by providing your username and password in the request body.
    2. Upon successful authentication, you will receive an access token in the response.

    URL: POST /localhost:8000/login

    Request Body (JSON):
    {
        "username": "your_username",
        "password": "your_password"
    }

#### 2. Use Access Token for Subsequent Requests
    After obtaining the access token, use it to authenticate subsequent requests.
    1. Copy the access token received during login.
    2. In the new HTTP request, set the Authorization type to "Bearer Token."
    3. Paste the copied access token in the provided field.
    4. Use the access token to authenticate your requests by including it in the Authorization header.

    GET /your-endpoint

     Request Body (JSON):
     {
         your-request-body
     }
    Authorization: Bearer your_access_token 

## How to Use El7a2ny
Welcome to El7a2ny! This guide will walk you through the steps to set up and use the project. Whether you are a beginner or an experienced developer, follow these steps to get started:

### Step 1:  Clone the Repository
Clone the repository to your local machine using the following command:

    git clone https://github.com/advanced-computer-lab-2023/Suicide-squad-Pharmacy.git

### Step 2: Install Dependencies
Navigate to the project directory and install the required dependencies:

    cd your-project
    npm install

All the required dependencies and apps can be found under the Installation section.

### Step 3: Configure the Environment
Create a .env file in the root directory using the following command:

    touch .env

Add the necessary environment variables: 
    
    MONGO_URI = "your-MongoDB-database-link"
    PORT = your-port-number
    STRIPE_KEY = your-stripe-key
    PUBLISHABLE_KEY = your-publishable-key

### Step 4: Start the Backend Server
Start the backend server by running:

    nodemon App.js

### Step 5: Start the Frontend Server
Open a new terminal window, navigate to the project directory, and start the frontend server:

    npm start

### Step 6: Access the Application
Open your web browser and go to http://localhost:3000 to access the application.

### Step 7: Register or Log In
If it's your first time, register for a new account. Otherwise, log in using your credentials.

### Step 8: Explore and Interact
Explore the features and functionalities of the application. Follow the on-screen prompts and use the intuitive user interface.

### Step 9: Test API Endpoints
If applicable, test API endpoints using tools like Postman. Refer to the "Tests" section in the README for detailed instructions.

### Step 10: Provide Feedback
If you encounter any issues or have suggestions, feel free to open an issue on GitHub or contribute to the project.

Congratulations! You have successfully set up and used **El7a2ny**. Enjoy exploring and using the application!
## Contributing

We welcome and appreciate contributions from the community. Whether you want to report a bug, suggest a feature, or contribute code, there are several ways you can help improve El7a2ny. Here's how you can get started:

### 1. Report Issues
If you come across any bugs, issues, or have suggestions for improvements, please open an issue on the GitHub repository. Be sure to provide detailed information about the problem and steps to reproduce it.

### 2. Feature Requests
Have an idea for a new feature? Submit a feature request on GitHub, explaining the proposed feature and its potential benefits. We value your input in shaping the project.

### 3. Code Contributions
If you're comfortable with coding, consider contributing directly to the project. Here's how you can do it:

    1. Fork the repository.
    2. Create a new branch for your changes.
    3. Make your changes and ensure they align with the project's coding standards.
    4. Test your changes thoroughly.
    5. Submit a pull request with a clear description of your changes.

### 4. Documentation
Good documentation is crucial for a successful project. If you notice areas where the documentation can be improved or if you have additional information to add, feel free to contribute to the documentation.


## Credits

### Youtube Videos

[MERN Stack Crash Course](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE)

[Introduction to React](https://www.youtube.com/playlist?list=PLZlA0Gpn_vH_NT5zPVp18nGe_W9LqBDQK)

[React Hooks](https://www.youtube.com/playlist?list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h)

[useState VS useEffect](https://codedamn.com/news/reactjs/usestate-and-useeffect-hooks)

[JWT Authentication #1](https://www.youtube.com/watch?v=mbsmsi7l3r4)

[JWT Authentication #2](https://www.youtube.com/watch?v=-RCnNyD0L-s)

[JWT Authentication #3](https://dev.to/salarc123/mern-stack-authentication-tutorial-part-1-the-backend-1c57)

[Stripe](https://youtu.be/1r-F3FIONl8)

Finally, we would like to express our gratitude to our professor and TAs, who have played a crucial role in the development and success of this project:

**Assoc. Prof. Mervat Abuelkheir, Eng. Nada Ibrahim, Eng. Hadwa Pasha, Eng. Noha Hamid, Eng. Fatma Elazab, Eng. Amr Diab and Eng. Mahmoud Mabrouk.**

Their guidance, expertise, and support have been invaluable throughout the development process. We extend our sincere appreciation to them for their contributions.


## License

[MIT](https://choosealicense.com/licenses/mit/)

[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)

[Apache](https://choosealicense.com/licenses/apache-2.0/)

