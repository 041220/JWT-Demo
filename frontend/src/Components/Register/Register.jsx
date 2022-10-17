
import { TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/apiRequest";
import "./register.css";
const Register = () => {
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      phonenumber: phonenumber,
      address: address,
      password: password,
      username: username
    };
    registerUser(newUser, dispatch, navigate);
  }
  return (
    <section className="register-container">
      <div className="register-title"> Sign up </div>
      <form className="form-register" onSubmit={handleRegister}>

        <TextField
          required
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          style={{ marginTop: '10px', marginBottom: '10px', marginRight: '30px', backgroundColor: 'rgba(212, 206, 190, 0.9)' }}
        />

        <TextField
          required
          type="text"
          placeholder="Enter your phone number"
          onChange={(e) => setPhonenumber(e.target.value)}
          label="Phone Number"
          style={{ marginTop: '10px', backgroundColor: 'rgba(212, 206, 190, 0.9)' }}
        />
        <TextField
          required
          type="text"
          placeholder="Enter your address"
          onChange={(e) => setAddress(e.target.value)}
          label="Address"
          style={{ marginTop: '10px', marginBottom: '10px', marginRight: '30px', backgroundColor: 'rgba(212, 206, 190, 0.9)' }}
        />
        <TextField
          required
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
          style={{ marginTop: '10px', backgroundColor: 'rgba(212, 206, 190, 0.9)' }}
        />
        <TextField
          required
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          style={{ marginTop: '10px', marginBottom: '20px', marginRight: '30px', backgroundColor: 'rgba(212, 206, 190, 0.9)' }}
        />
        <TextField
          required
          type="password"
          placeholder="Confirm your password"

          label="Confirm Password"
          style={{ marginTop: '10px', backgroundColor: 'rgba(212, 206, 190, 0.9)' }}
        />

        <button type="submit"> Create account </button>
      </form>
    </section>
  );
};

export default Register;
