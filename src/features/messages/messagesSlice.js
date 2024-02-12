import { createSlice } from "@reduxjs/toolkit";

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        value: [0, ""],
    },
    reducers: {
        addMessage: (state, message) => {
            state.value = [1, message.payload];
        },
        resetMessage: (state) => {
            state.value = [0, ""]
        }
    },
});

export const { addMessage, resetMessage } = messagesSlice.actions;


export default messagesSlice.reducer;


