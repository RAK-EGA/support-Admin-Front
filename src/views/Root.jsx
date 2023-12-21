import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../styles/root.css";
import SideBar from "../components/SideBar";
export default function Root() {
    return (
        <div id="page--layout">
            <NavBar />
            <div id="content">
                <div id="sidebar">
                    <SideBar />
                </div>
                <div id="detail"> 
                
            
                
                <Outlet />

                </div>


            </div>
        </div>



    );
}