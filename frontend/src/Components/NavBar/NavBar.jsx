// import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./navbar.css";
import { logOut } from "../../redux/apiRequest";
import { createAxios } from "../../createInstance";
import { logOutSuccess } from "../../redux/authSlice";

const NavBar = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  console.log("user:", user);
  const accessToken = user?.accessToken;

  const id = user?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, logOutSuccess);

  const handleLogout = () => {
    logOut(dispatch, id, navigate, accessToken, axiosJWT);
  }
  return (
    <nav className="navbar-container">

      {user ? (
        <>
          <p style={{ color: 'rgb(163, 162, 162)', fontWeight: '700' }}>Welcom Secure Web, <span className="navbar-user">  {user.username} </span> </p>
          <Link to="/" className="navbar-link"> Home </Link>
          <Link to="/change-password" className="navbar-link">Change password</Link>
          <Link to="/logout" className="navbar-link" onClick={handleLogout}>Log out</Link>
        </>
      ) : (
        <>
          <Link to="/" className="navbar-link"> Home </Link>
          <Link to="/login" className="navbar-link"> Login </Link>
          <Link to="/register" className="navbar-link"> Register</Link>

        </>
      )}
    </nav>
  );
};

export default NavBar;
