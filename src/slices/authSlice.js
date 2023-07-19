import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';
import jwtDecode from 'jwt-decode';

const initialState = {
    token: localStorage.getItem("token"),
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    createdAt: "",
    registerStatus: "",
    registerError: "",
    loginStatus: "",
    loginError: "",
    userLoaded: false,
};

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (user, {rejectWithValue}) => {
        try {
            const token = await axios.post(`${baseUrl}/auth/register`, {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
            });

            localStorage.setItem("token", token.data);

            return token.data
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (user, {rejectWithValue}) => {
        try {
            const token = await axios.post(`${baseUrl}/auth/login`, {
                email: user.email,
                password: user.password,
            });

            localStorage.setItem("token", token.data);

            return token.data
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loadUser(state, action) {
            const token = state.token;

            if(token) {
                const user = jwtDecode(token);

                return {
                    ...state,
                    token,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.createdAt,
                    id: user.id,
                    userLoaded: true,
                }
            }
        },
        logoutUser(state, action) {
            localStorage.removeItem("token");

            return {
                ...state,
                id: "",
                firstName: "",
                lastName: "",
                email: "",
                role: "",
                createdAt: "",
                registerStatus: "",
                registerError: "",
                loginStatus: "",
                loginError: "",
                userLoaded: false,
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(registerUser.pending, (state, action) => {
            return { ...state, registerStatus: "pending" }
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            if(action.payload) {

                const user = jwtDecode(action.payload);

                return {
                    ...state,
                    token: action.payload,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.createdAt,
                    id: user.id,
                    registerStatus: "success"
                }
            } else return state;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            return {
                ...state,
                registerStatus: "rejected",
                registerError: action.payload
            }
        });
        // login
        builder.addCase(loginUser.pending, (state, action) => {
            return { ...state, loginStatus: "pending" }
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            if(action.payload) {

                const user = jwtDecode(action.payload);

                return {
                    ...state,
                    token: action.payload,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.createdAt,
                    id: user.id,
                    loginStatus: "success"
                }
            } else return state;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            return {
                ...state,
                loginStatus: "rejected",
                loginError: action.payload
            }
        });
    },
});

export const { loadUser, logoutUser } = authSlice.actions

export default authSlice.reducer;