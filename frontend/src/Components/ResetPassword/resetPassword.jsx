import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/apiRequest';

const ResetPassword = (userList) => {
    const [newPassword, setNewPassowrd] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const param = useParams();
    console.log("param:", param);
    const handleResetPassword = () => {
        console.log("newPass:", newPassword);
        resetPassword(newPassword, dispatch, navigate, param.id)
    }
    console.log("userList", userList.userList);

    return (

        <div className="root-login">
            <section className="login-container">
                <div className="login-title" style={{ font: 'Roboto' }}> Reset password</div>
                <div className="form-login" >
                    <TextField
                        type="password"
                        placeholder="Enter your new password"
                        onChange={(e) => setNewPassowrd(e.target.value)}
                        fullWidth
                        label="New password"
                        style={{ marginTop: '10px' }} />
                    <TextField
                        type="password"
                        placeholder="Enter your confirm new password"

                        fullWidth
                        label="Confirm new password"
                        style={{ marginTop: '10px' }} />
                    <button onClick={handleResetPassword}>Continue</button>

                </div>

            </section>
        </div>

    )
}

export default ResetPassword