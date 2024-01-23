import { configureStore } from "@reduxjs/toolkit";
import darkmodeReducer from "./features/darkmode/darkmodeSlice";
import authReducer from "./features/auth/authSlice";

export default configureStore({
    reducer: {
        darkmode: darkmodeReducer,
        auth: authReducer,
    },
})