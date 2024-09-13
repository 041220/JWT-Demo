import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false
        },
        register: {
            isFetching: false,
            error: false,
            success: false
        },
        forgotPassword: {
            isFetching: false,
            currentEmail: false,
            error: false,
        },
        newPassword: {
            isFetching: false,
            passwordReset: null,
            error: false,
        },
        passwordChanged: {
            isFetching: false,
            passwordReset: null,
            error: false,
        }
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
        },
        registerFailed: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        },
        forgotPasswordStart: (state) => {
            state.forgotPassword.isFetching = true;
        },
        forgotPasswordSuccess: (state) => {
            state.forgotPassword.isFetching = false;
            state.forgotPassword.error = false;
            state.forgotPassword.success = true;
        },
        forgotPasswordFailed: (state) => {
            state.forgotPassword.isFetching = false;
            state.forgotPassword.error = true;
            state.forgotPassword.success = false;
        },
        resetPasswordStart: (state) => {
            state.newPassword.isFetching = true;
        },
        resetPasswordSuccess: (state, action) => {
            state.newPassword.isFetching = false;
            state.newPassword.error = false;
            state.newPassword.passwordReset = action.payload;
        },
        resetPasswordFailed: (state) => {
            state.newPassword.isFetching = false;
            state.newPassword.error = true;
            state.newPassword.passwordReset = null;
        },
        changePasswordStart: (state) => {
            state.passwordChanged.isFetching = true;
        },
        changePasswordSuccess: (state, action) => {
            state.passwordChanged.isFetching = false;
            state.passwordChanged.error = false;
            state.passwordChanged.passwordReset = action.payload;
        },
        changePasswordFailed: (state) => {
            state.passwordChanged.isFetching = false;
            state.passwordChanged.error = true;
            state.passwordChanged.passwordReset = null;
        },


        logOutSuccess: (state) => {
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.login.error = false;
        },
        logOutFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        logOutStart: (state) => {
            state.login.isFetching = true;
        },

    }
});

export const {
    loginStart,
    loginFailed,
    loginSuccess,
    registerStart,
    registerSuccess,
    registerFailed,
    logOutStart,
    logOutSuccess,
    logOutFailed,
    forgotPasswordStart,
    forgotPasswordSuccess,
    forgotPasswordFailed,
    resetPasswordStart,
    resetPasswordSuccess,
    resetPasswordFailed,
    changePasswordStart,
    changePasswordSuccess,
    changePasswordFailed,

} = authSlice.actions;

export default authSlice.reducer;

