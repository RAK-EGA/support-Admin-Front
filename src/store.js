import { configureStore } from "@reduxjs/toolkit";
import darkmodeReducer from "./features/darkmode/darkmodeSlice";
import authReducer from "./features/auth/authSlice";
import notificationsReducer from "./features/notifications/notificationsSlice";
import messagesReducer from "./features/messages/messagesSlice";
export default configureStore({
    reducer: {
        darkmode: darkmodeReducer,
        auth: authReducer,
        notifications: notificationsReducer,
        messages: messagesReducer,
    },
})