import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../redux/apiRequest';

const ChangePassword = () => {
    const [passwordChanged, setPasswordChanged] = useState("");

    const user = useSelector((state) => state.auth.login.currentUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log("user2:", user._id);

    const handleChangePassword = () => {
        console.log("newPass:", passwordChanged);
        changePassword(passwordChanged, dispatch, navigate, user._id)
    }

    return (

        <div className="root-login">
            <section className="login-container">
                <div className="login-title" style={{ font: 'Roboto' }}> Change password</div>
                <div className="form-login" >
                    <TextField
                        type="password"
                        placeholder="Enter your new password"
                        onChange={(e) => setPasswordChanged(e.target.value)}
                        fullWidth
                        label="New password"
                        style={{ marginTop: '10px' }} />
                    <TextField
                        type="password"
                        placeholder="Enter your confirm new password"

                        fullWidth
                        label="Confirm new password"
                        style={{ marginTop: '10px' }} />
                    <button onClick={handleChangePassword}>Continue</button>

                </div>

            </section>
        </div>

    )
}

export default ChangePassword;