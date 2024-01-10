import { configureStore } from "@reduxjs/toolkit";
import darkmodeReducer from "./features/darkmode/darkmodeSlice";

export default configureStore({
    reducer: {
        darkmode: darkmodeReducer,
    },
})