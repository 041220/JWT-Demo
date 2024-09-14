import axios from "axios";

import {
    changePasswordFailed,
    changePasswordStart,
    changePasswordSuccess,
    forgotPasswordFailed,
    forgotPasswordStart,
    forgotPasswordSuccess,
    loginFailed,
    loginStart,
    loginSuccess,
    logOutFailed,
    logOutStart,
    logOutSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
    resetPasswordFailed,
    resetPasswordStart,
    resetPasswordSuccess,
} from "./authSlice";
import {
    deleteUserFailed,
    deleteUserSuccess,
    deleteUserStart,
    getUsersFailed,
    getUsersStart,
    getUsersSuccess,
} from "./userSlice";

const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://jwt-demo-dzyr.onrender.com'
    : 'http://localhost:8000';
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${API_BASE_URL}/v1/auth/login`, user);
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch (err) {
        dispatch(loginFailed());
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post(`${API_BASE_URL}/v1/auth/register`, user);
        dispatch(registerSuccess());
        navigate("/login");
    } catch (err) {
        dispatch(registerFailed());
    }
};
export const forgotPassword = async (email, dispatch, navigate, setCheckEmail) => {
    dispatch(forgotPasswordStart());
    try {
        const res = await axios.post(`${API_BASE_URL}/v1/auth/forgot-password`, { email });
        console.log("res", res.data);
        dispatch(forgotPasswordSuccess(res.data));
        if (res.data.success === true) {
            alert(res.data.msg)

        }
        else {
            alert("Email khong chinh xac")
        }
    } catch (error) {
        console.log(error);
        dispatch(forgotPasswordFailed())
    }
};
export const resetPassword = async (newPassword, dispatch, navigate, id) => {

    dispatch(resetPasswordStart());
    try {
        const res = await axios.post(`${API_BASE_URL}/v1/auth/reset-password/${id}`, { password: newPassword });
        dispatch(resetPasswordSuccess(res.data))
        navigate("/login")
    } catch (error) {
        dispatch(resetPasswordFailed())
    }
};
export const changePassword = async (changedPassword, dispatch, navigate, id) => {
    dispatch(changePasswordStart());
    try {
        const res = await axios.post(`${API_BASE_URL}/v1/auth/reset-password/${id}`, { password: changedPassword });
        dispatch(changePasswordSuccess(res.data))
        navigate("/login")
    } catch (error) {
        dispatch(changePasswordFailed())
    }
};

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUsersStart());
    try {
        const res = await axiosJWT.get(`${API_BASE_URL}/v1/user`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
        dispatch(getUsersFailed());
    }
};
export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
    dispatch(deleteUserStart());
    try {
        const res = await axiosJWT.delete("/v1/user/" + id, {
            headers: { token: `Bearer ${accessToken}` },
        });
        console.log("data:", res.data);
        dispatch(deleteUserSuccess(res.data));
    } catch (err) {
        dispatch(deleteUserFailed(err.response.data));
    }
};

export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
    dispatch(logOutStart());
    try {
        await axiosJWT.post("/v1/auth/logout", id, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(logOutSuccess());
        navigate("/login");
    } catch (err) {
        dispatch(logOutFailed());
    }
};
