import { createSlice } from "@reduxjs/toolkit";

export const darkmodeSlice = createSlice({
    name: 'darkmode',
    initialState: {
        value: localStorage.getItem("darkmode") ? eval(localStorage.getItem("darkmode")) : false,
    },
    reducers: {
        toggle: (state) => {
            state.value = !state.value;
            localStorage.setItem("darkmode", state.value);
        },
    },
});

export const { toggle } = darkmodeSlice.actions;


export default darkmodeSlice.reducer;


