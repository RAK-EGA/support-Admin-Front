import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

const useAuth = () => {
    const user = localStorage.getItem("user");
    if (user === null) {
        return false;
    }
    // make a call to check if token still autherized or NO would this handle all thou?
    return true
}

export default function Auth() {
    const isAuth = useAuth()

    useEffect(() => {
        let interval = setInterval(() => {
            if (isAuth) {
                // call api to refresh every 30min
            }
        }, 2000);
        return () => clearInterval(interval);
// add auth token to be here  and i can add a state make it change when ever it changes but I will have to make it global
// since iam using redux i will use that and just have fun instead
    }, []);

    return isAuth ? <Outlet /> : <Navigate to="signIn" />;
}