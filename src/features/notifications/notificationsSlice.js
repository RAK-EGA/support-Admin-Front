import { createSlice } from "@reduxjs/toolkit";

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        value: 0,
    },
    reducers: {
        add: (state, num) => {
            state.value = num.payload;
        },
    },
});

export const { add } = notificationsSlice.actions;


export default notificationsSlice.reducer;


