import { Link } from "react-router-dom";
import logo from "../assets/logo.png"
import profile from "../assets/profile.png"
import { useSelector } from "react-redux";
export default function NavBar() {
    const isDarkmode = useSelector((state) => state.darkmode.value);
    const className = isDarkmode?'dark--nav':""
    return (
        <div className={`nav--bar ${className}`}>
            <Link to="/">
                <img className="img--logo" src={logo} alt="logo" />

            </Link>
            <Link to="/profile">
                <img className="img--profile" src={profile} alt="profile" />
            </Link>

        </div>
    );
}