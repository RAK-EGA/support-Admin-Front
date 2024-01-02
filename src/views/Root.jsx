import {
    Outlet,
    useNavigation,
} from "react-router-dom";
import NavBar from "../components/NavBar";
import "../styles/root.css";
import SideBar from "../components/SideBar";
export default function Root() {
    const navigation = useNavigation();
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
                        navigation.state === "loading" ? "loading" : ""
                    }>



                    <Outlet />

                </div>


            </div>
        </div>



    );
}