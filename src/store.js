import { configureStore } from "@reduxjs/toolkit";
import darkmodeReducer from "./features/darkmode/darkmodeSlice";
import authReducer from "./features/auth/authSlice";
import notificationsReducer from "./features/notifications/notificationsSlice";
export default configureStore({
    reducer: {
        darkmode: darkmodeReducer,
        auth: authReducer,
        notifications: notificationsReducer
    },
})