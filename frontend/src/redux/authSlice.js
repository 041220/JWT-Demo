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
        resetPassword: {
            isFetching: false,
            passwordReset: null,
            error: false
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
            console.log("state:", state);
            state.resetPassword.isFetching = true;
        },
        resetPasswordSuccess: (state, action) => {
            state.resetPassword.isFetching = false;
            state.resetPassword.error = false;
            state.resetPassword.passwordReset = action.payload;
        },
        resetPasswordFailed: (state) => {
            state.resetPassword.isFetching = false;
            state.resetPassword.error = true;
            state.resetPassword.passwordReset = null;
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
    resetPasswordFailed

} = authSlice.actions;

export default authSlice.reducer;

