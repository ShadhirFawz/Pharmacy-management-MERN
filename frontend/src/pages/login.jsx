import { useNavigate } from "react-router-dom";
import Form from "../components/Form.jsx";
import { useDispatch } from "react-redux";
import { loggedIn } from "../features/login.js";
import Validation from "../validate/validate";
import Input from "../components/Input.jsx";
import MainBtn from "../components/Button.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import NavBar from "../components/NavBar.jsx";


function Login() {
  let { errors, handleSubmit, register } = Validation("login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
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
      } else if (response.data.userDoctor) {
        sessionStorage.setItem("token", response.data.userDoctor.accessToken);
        navigate(`/doctorView/${username}`);
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
      <NavBar />
      {/* <Form title="login" inputArr={inputArr} type="login" btnArr={btnArr} /> */}
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

          {/* {type == 'register' && (
          <p className="text-center mt-3 small-txt">
            By Creating an account you agree to our
            <a className="green-txt"> Terms of use </a>
            and
            <a className="green-txt"> Privacy Policy</a>
          </p>
        )} */}

          <div className="mt-3">
            <MainBtn
              txt="login"
              style="green-btn"
              // action={handleSubmit(c)}
              action={handleLogin}
            />
          </div>

          <p className="text-center mt-3 small-txt">
            {/* {type == 'register' ? (
            <>
              Have an account?
              <Link to="/" className="green-txt">
                {' '}
                Login
              </Link>
            </>
          ) : type == 'login' ? ( */}
            <>
              Forgot Password?
              <Link to="/forgotpassword" className="green-txt">
                {" "}
                Reset Password
              </Link>
            </>
            {/* ) : (
            ''
          )} */}
          </p>
        </div>
      </form>
    </div>
  );
}
export default Login;
