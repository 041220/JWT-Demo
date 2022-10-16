import { TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../redux/apiRequest';

const ForgotPassword = () => {
    const [checkEmail, setCheckEmail] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFindEmail = () => {
        console.log("checkemail:", checkEmail);
        forgotPassword(checkEmail, dispatch, navigate, setCheckEmail);
    }
    return (
       
            <div className="root-login">
                <section className="login-container">
                    <div className="login-title" style={{ font: 'Roboto' }}> Forgot password</div>
                    <div className="form-login" >
                        <TextField
                            type="text"
                            placeholder="Enter your email"
                            onChange={(e) => setCheckEmail(e.target.value)}
                            fullWidth
                            label="Find Email"
                            style={{ marginTop: '10px' }} />
                        <button onClick={handleFindEmail}>Find Email</button>

                    </div>

                </section>
            </div>
        
    )
}


export default ForgotPassword;