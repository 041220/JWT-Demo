import "./App.css";
import HomePage from "./Components/Home/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NavBar from "./Components/NavBar/NavBar";
import ForgotPassword from "./Components/ForgotPassword/forgotPassword";
import ResetPassword from "./Components/ResetPassword/resetPassword";
import { useSelector } from "react-redux";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
// import { useState } from "react";

function App() {

  const user = useSelector((state) => state.auth.login.currentUser);

  return (
    <Router>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:id" element={< ResetPassword />} />
          <Route path="/change-password" element={< ChangePassword user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
