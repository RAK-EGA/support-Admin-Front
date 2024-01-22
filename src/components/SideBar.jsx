import casesIcon from "../assets/casesIcon.png"
import logoutIcont from "../assets/Logout.png"
import darkmodeIcon from "../assets/darkmodeIcon.png"
import announcementsIcon from "../assets/anouncementsIcon.png"

import permitsIcon from "../assets/Permits.png"

import Toggle from 'react-toggle'
import "react-toggle/style.css"

import { NavLink } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"
import { toggle } from "../features/darkmode/darkmodeSlice"
import { useEffect } from "react"

export default function NavBar() {
    const isDarkmode = useSelector((state) => state.darkmode.value);
    const dispatch = useDispatch();
    const className = isDarkmode ? "side--bar-dark " : "side--bar-light";
    useEffect(() => {
        document.body.style.backgroundColor = isDarkmode ? 'rgb(0 0 0 / 36%)' : '#F3F1EA';
        /* Side Nav */

        // box-shadow: 8px 4px 4.6px rgba(210, 199, 173, 0.25);

    },);
    return (
        <div className={`side--bar ${className}`}>

            <nav>
                <ul>
                    <li>
                        {/* <Link to={}/> */}
                        <NavLink
                            to={`tickets/`}
                            className={({ isActive, isPending }) =>
                                isActive
                                    ? isDarkmode ? "active-dark" : "active"
                                    : isPending
                                        ? isDarkmode ? "pending-dark" : "pending"
                                        : ""
                            }
                        >
                            <img src={casesIcon} alt="cases Icon" /><span>Tickets</span>

                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={`announcements/`}
                            className={({ isActive, isPending }) =>
                                isActive
                                    ? isDarkmode ? "active-dark" : "active"
                                    : isPending
                                        ? isDarkmode ? "pending-dark" : "pending"
                                        : ""
                            }
                        >
                            <img src={announcementsIcon} alt="announcements Icon" /><span>Announcements</span>
                        </NavLink>

                    </li>
                    {/* News Out of project scope may delete later */}
                    {/* <li>
                        <NavLink
                            to={`News/`}
                            className={({ isActive, isPending }) =>
                                isActive
                                    ? "active"
                                    : isPending
                                        ? "pending"
                                        : ""
                            }
                        >
                            <img src={newsIcon} alt="news Icon" /><span>News</span>
                        </NavLink>
                    </li> */}
                    {/* moved responsibility to Admin/Service domain */}
                    {/* <li>
                        <NavLink
                            to={`users/`}
                            className={({ isActive, isPending }) =>
                                isActive
                                    ? "active"
                                    : isPending
                                        ? "pending"
                                        : ""
                            }
                        >
                            <img src={usersIcon} alt="users Icon" /><span>Users</span>
                        </NavLink>
                    </li> */}
                    <li>
                        <NavLink
                            to={`requests/`}
                            className={({ isActive, isPending }) =>
                                isActive
                                    ? isDarkmode ? "active-dark" : "active"
                                    : isPending
                                        ? isDarkmode ? "pending-dark" : "pending"
                                        : ""
                            }
                        >
                            <img src={permitsIcon} alt="pernits Icon" /><span>Requests</span>
                        </NavLink>
                    </li>

                </ul>

            </nav>
            <div className="side--bottom">
                <div className="dark--mode">
                    <img src={darkmodeIcon} style={{
                        height: '43px',
                        width: '43px'
                    }} alt="" />
                    <label className="toggle--lable" htmlFor="toggle-1">
                        Dark Mode
                    </label>
                    <Toggle
                        name="toggle-1"
                        checked={isDarkmode}
                        className="custom"
                        icons={{
                            checked: "On",
                            unchecked: "Off",
                        }}
                        onChange={(e) => {
                            dispatch(toggle());
                        }
                        }
                    />
                </div>

                <div >
                    <button className="logout--button" style={{
                        color: isDarkmode ? "#000000" : "#FFFFFF"

                    }}>
                        <svg style={{
                            marginRight: "7px",
                        }} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.6066 2.57819C17.6345 2.57819 20.1039 5.00529 20.1039 7.99343V13.8356H12.6584C12.1248 13.8356 11.7029 14.2502 11.7029 14.7747C11.7029 15.2869 12.1248 15.7138 12.6584 15.7138H20.1039V21.5437C20.1039 24.5319 17.6345 26.9712 14.5818 26.9712H8.53851C5.49825 26.9712 3.02881 24.5441 3.02881 21.5559V8.00563C3.02881 5.00529 5.51065 2.57819 8.55092 2.57819H14.6066ZM23.2021 10.5671C23.568 10.189 24.1656 10.189 24.5315 10.5549L28.0929 14.1041C28.2758 14.2871 28.3734 14.5188 28.3734 14.7749C28.3734 15.0189 28.2758 15.2628 28.0929 15.4335L24.5315 18.9827C24.3485 19.1657 24.1046 19.2632 23.8729 19.2632C23.6289 19.2632 23.385 19.1657 23.2021 18.9827C22.8362 18.6168 22.8362 18.0192 23.2021 17.6533L25.1535 15.7141H20.1042V13.8358H25.1535L23.2021 11.8966C22.8362 11.5307 22.8362 10.933 23.2021 10.5671Z" fill={isDarkmode ? "black" : "white"} />
                        </svg>
                        Logout
                    </button>
                </div>

            </div>
        </div>

    );

}