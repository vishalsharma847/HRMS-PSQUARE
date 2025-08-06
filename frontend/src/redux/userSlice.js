import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        registerData:null,
    },
    reducers: {
        setRegisterData: (state, action) => {
            state.registerData = action.payload;
        },
        clearRegisterData: (state) => {
            state.registerData = null
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null
        }
    },
});

export const { setUser, clearUser,setRegisterData,clearRegisterData } = userSlice.actions;