import { Link } from "react-router-dom";
import logo from "../assets/logo.png"
import profile from "../assets/profile.png"
export default function NavBar() {
    return (
        <div className="nav--bar">
            <Link to="/">
                <img className="img--logo" src={logo} alt="logo" />

            </Link>
            <Link to="/profile">
                <img className="img--profile" src={profile} alt="profile" />
            </Link>

        </div>
    );
}