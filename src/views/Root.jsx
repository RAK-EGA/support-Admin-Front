import {
    Outlet,
    useNavigation,
} from "react-router-dom";
import NavBar from "../components/NavBar";
import "../styles/root.css";
import SideBar from "../components/SideBar";
import { useSelector } from "react-redux";
export default function Root() {
    const navigation = useNavigation();
    const isDarkmode = useSelector((state) => state.darkmode.value);
    const classname = isDarkmode ? "dark--primary" : "light--primary"
    return (
        <div id="page--layout">
            <NavBar />
            <div id="content">
                <div id="sidebar">
                    <SideBar />
                </div>
                <div
                    id="detail"
                    className={
                        navigation.state === "loading" ? `loading ${classname}` : classname
                    }>



                    <Outlet />

                </div>


            </div>
        </div>



    );
}