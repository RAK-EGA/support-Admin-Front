import { useEffect } from "react";
import { Outlet, Navigate, redirect } from "react-router-dom";
import { get } from '../helper functions/helperFunctions'
import { useSelector, useDispatch } from "react-redux";
import { update } from "../features/auth/authSlice";






export default function Auth() {
    // must use something else i guess redux
    const token = useSelector((state) => state.auth.value);
    const dispatch = useDispatch();



    useEffect(() => {
        const updateToken = async () => {
            const [res, error] = await get('/support/refreshToken');
            if (error) {
                console.log(error);
                localStorage.removeItem("user");
                dispatch(update())
                return redirect("/signIn")

            }

            let user = JSON.parse(localStorage.getItem('user'));

            user.accessToken = res.data.refreshToken;
            localStorage.setItem("user", JSON.stringify(user));

            dispatch(update())

        }
        let interval = setInterval(() => {
            if (token) {
                // call api to refresh every 28min 1680000 ms
                updateToken()
            }
        }, 1500000);
        return () => clearInterval(interval);
        // add auth token to be here  and i can add a state make it change when ever it changes but I will have to make it global
        // since iam using redux i will use that and just have fun instead
    }, [dispatch, token]);

    return token ? <Outlet /> : <Navigate to="signIn" />;
}