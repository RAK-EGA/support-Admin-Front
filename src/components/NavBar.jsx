import { Link } from "react-router-dom";
import logo from "../assets/logo.png"
import profile from "../assets/profile.png"
export default function NavBar() {
    return (
        <div className="nav--bar">
            <img className="img--logo" src={logo} alt="logo" />

            <img className="img--profile" src={profile} alt="profile" />
        </div>
    );
}