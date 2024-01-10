import { useEffect } from "react";
import { Outlet } from "react-router-dom";

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
   
    return isAuth ? <Outlet /> : <div>usenavigate to go to signin</div>;
}