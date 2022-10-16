import "./login.css";
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    loginUser(user, dispatch, navigate);
  };

  return (

    <div className="root-login">
      <section className="login-container">
        <div className="login-title" style={{ font: 'Roboto' }}> Login</div>
        <form className="form-login" onSubmit={handleLogin}>

          <TextField
            type="text"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            label="Username"
            style={{ marginTop: '10px' }} />

          <TextField
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            label="Password"
            style={{ marginTop: '20px' }} />

          <Link className="forgot-password" to="/forgot-password">
            Forgot password
          </Link>
          <button className="btn-continue" type="submit"> Continue </button>
        </form>
        <div className="login-register"> Don't have an account yet? </div>
        <Link className="login-register-link" to="/register">
          Register one for free
        </Link>
      </section>
    </div>

  );
};

export default Login;
