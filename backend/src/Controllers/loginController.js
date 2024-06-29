const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const Patient = require('../Models/patient');
const Pharmacist = require('../Models/pharmacist');
const Administrator = require('../Models/administrator');
const Doctor = require('../Models/Doctor');

app.use(express.json());

// create json web token
/*const createToken = (name) => {
    return jwt.sign({ name }, 'supersecret', {
        expiresIn: maxAge
    });
};


const login = async (req, res) => {
  const { Username, password } = req.body;
  try {
    const userpharmacist = await Pharmacist.findOne({ Username: Username });
    const userPatient = await patient.findOne({ Username: Username });
    const userAdmin = await Administrator.findOne({ Username: Username });

    if (userpharmacist && !userPatient&& !userAdmin) {
      //const isPasswordMatch1 = await compare(password, userpharmacist.Password);
          
      if (password===userpharmacist.Password) {
        const token = createToken(userpharmacist.Username);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ userpharmacist, token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else if (!userpharmacist && userPatient&& !userAdmin) {
       
        if (password===userPatient.Password) {
          const token = createToken(userPatient.Username);
          res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
          res.status(200).json({ userPatient, token });
        }
        else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      }
    
    else if (!userpharmacist && !userPatient&& userAdmin) {
      if (password===userAdmin.Password) {
          const token = createToken(userAdmin.Username);
          res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
          res.status(200).json({ userAdmin, token });
        } else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      }
    
    else {
      res.status(401).json({ error: 'User not found' });
    }
  }
   catch (error) {
    res.status(400).json({ error: error.message });
  }
};




const logout = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 }); // Clear the JWT cookie to log the user out
  res.status(200).json({ message: 'Logged out successfully' });
}

module.exports = {
    login,
    logout
  };*/

  //const maxAge = 3 * 24 * 60 * 60;

  let refreshTokens = [];

const refresh = (req, res) => {
  //take the refresh token from the user
  const refreshToken = req.body.token;

  //send error if there is no token or it's invalid
  if (!refreshToken) return res.status(401).json("You are not authenticated!");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }
  jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });

  //if everything is ok, create new access token, refresh token and send to user
};

const generateAccessToken = (user) => {
  return jwt.sign({ _id: user._id, Username: user.Username }, "mySecretKey", {
    expiresIn: '60m',
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ _id: user._id, Username: user.Username }, "myRefreshSecretKey");
};

const login = async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  const { username, password } = req.body;
  const patient = await Patient.findOne({Username: username, Password: password});
  const admin = await Administrator.findOne({Username: username, Password: password});
  const pharmacist = await Pharmacist.findOne({Username: username, Password: password});
  const doctor = await Doctor.findOne({Username: username, Password: password});

  if (patient && !admin && !pharmacist && !doctor) {
    //Generate an access token
    const accessToken = generateAccessToken(patient);
    const refreshToken = generateRefreshToken(patient);
    refreshTokens.push(refreshToken);
    const userPatient = {
      _id: patient._id,
      Username: patient.Username,
      accessToken,
      refreshToken,
    }
    res.json({userPatient});
  } else if (!patient && admin && !pharmacist && !doctor) {
    //Generate an access token
    const accessToken = generateAccessToken(admin);
    const refreshToken = generateRefreshToken(admin);
    refreshTokens.push(refreshToken);
    const userAdmin = {
      _id: admin._id,
      Username: admin.Username,
      accessToken,
      refreshToken,
    }
    res.json({userAdmin});
  } 
  else if (!patient && !admin && pharmacist && !doctor) {
    //Generate an access token
    const accessToken = generateAccessToken(pharmacist);
    const refreshToken = generateRefreshToken(pharmacist);
    refreshTokens.push(refreshToken);
    const userpharmacist = {
      _id: pharmacist._id,
      Username: pharmacist.Username,
      accessToken,
      refreshToken,
    }
    res.json({userpharmacist});
  } 
  else if (!patient && !admin && !pharmacist && doctor) {
    //Generate an access token
    const accessToken = generateAccessToken(doctor);
    const refreshToken = generateRefreshToken(doctor);
    refreshTokens.push(refreshToken);
    const userDoctor = {
      _id: doctor._id,
      Username: doctor.Username,
      accessToken,
      refreshToken,
    }
    res.json({userDoctor});
  } 
  else {
    res.status(400).json("Username or password incorrect!");
  }
};

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
};

const logout =  (req, res) => {
  const { username } = req.params;
  if (!(req.user.Username === username)) {
    res.status(403).json("You are not logged in!");
}else{
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json("You logged out successfully.");
}
};

module.exports = {
  refresh,
  login,
  logout,
  verify
}