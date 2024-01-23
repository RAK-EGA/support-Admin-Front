import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).accessToken : null,
    },
    reducers: {
        update: (state) => {
            state.value = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).accessToken : null;
        },
    },
});

export const { update } = authSlice.actions;


export default authSlice.reducer;


