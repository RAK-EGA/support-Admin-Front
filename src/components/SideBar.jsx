import unviewedTicketsIcon from "../assets/unviewedTicketsIcon.png"
import acceptedTicketsIcon from "../assets/acceptedTicketsIcon.png"
import ticketsHistoryIcon from "../assets/ticketsHistoryIcon.png"
import unviewedRequestsIcon from "../assets/unviewedRequestsIcon.png"
import acceptedRequestsIcon from "../assets/acceptedRequestsIcon.png"
import requestsHistoryIcon from "../assets/requestsHistoryIcon.png"
import darkmodeIcon from "../assets/darkmodeIcon.png"
import announcementsIcon from "../assets/anouncementsIcon.png"
import notificationIcon from "../assets/notificationsIcon.png"

import Toggle from 'react-toggle'
import "react-toggle/style.css"

import { NavLink, useNavigate } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"
import { toggle } from "../features/darkmode/darkmodeSlice"
import { useEffect } from "react"
import { update } from "../features/auth/authSlice"
import { get } from "../helper functions/helperFunctions"
import { add } from "../features/notifications/notificationsSlice"

export default function NavBar() {

    const isDarkmode = useSelector((state) => state.darkmode.value);
    const notificationsCounter = useSelector((state) => state.notifications.value);
    const className = isDarkmode ? "side--bar-dark " : "side--bar-light";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("user");
        dispatch(update(null));
        dispatch(add(0));

        navigate("/signIn")
    }
    useEffect(() => {
        document.body.style.backgroundColor = isDarkmode ? 'rgb(0 0 0 / 36%)' : '#F3F1EA';
        /* Side Nav */

        // box-shadow: 8px 4px 4.6px rgba(210, 199, 173, 0.25);

    },[isDarkmode]);
    useEffect(() => {
        const checkNotificationCount = async () => {
            const [res, error] = await get('/support/notificationsCounter');
            if (error) {
                throw error;
            }
            if (res.status == '401') {
                // cant redirect from here maybe change status to null or something and then if it becomes null usenavigate to /signin
                logout()
            }

            const num = res.data
            dispatch(add(num));

        }
        checkNotificationCount()
        let interval = setInterval(() => {

            // call api to check count of notifications every 5min 300000 ms
            checkNotificationCount()

        }, 300000);
        return () => clearInterval(interval);

    },);


    return (
        <div className={`side--bar ${className}`}>

            <nav>
                <ul>

                    {
                        JSON.parse(localStorage.getItem('user')).user.type.includes("complaint") &&
                        <>
                            <li>
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
                                    <img src={unviewedTicketsIcon} alt="unviewed Tickets Icon" /><span>Unviewed Complaints</span>

                                </NavLink>
                            </li>
                            <li>
                                {/* <Link to={}/> */}
                                <NavLink
                                    to={`AcceptedTickets/`}
                                    className={({ isActive, isPending }) =>
                                        isActive
                                            ? isDarkmode ? "active-dark" : "active"
                                            : isPending
                                                ? isDarkmode ? "pending-dark" : "pending"
                                                : ""
                                    }
                                >
                                    <img src={acceptedTicketsIcon} alt="Accepted Tickets Icon" /><span>Accepted Complaints</span>

                                </NavLink>
                            </li>
                            <li>
                                {/* <Link to={}/> */}
                                <NavLink
                                    to={`TicketsHistory/`}
                                    className={({ isActive, isPending }) =>
                                        isActive
                                            ? isDarkmode ? "active-dark" : "active"
                                            : isPending
                                                ? isDarkmode ? "pending-dark" : "pending"
                                                : ""
                                    }
                                >
                                    <img src={ticketsHistoryIcon} alt="tickets history Icon" /><span>Complaints History</span>

                                </NavLink>
                            </li>
                        </>
                    }


                    {
                        JSON.parse(localStorage.getItem('user')).user.type.includes("permit") &&
                        <>
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
                                    <img src={unviewedRequestsIcon} alt="unviewed requests Icon" /><span>Unviewed Permits</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={`AcceptedRequests/`}
                                    className={({ isActive, isPending }) =>
                                        isActive
                                            ? isDarkmode ? "active-dark" : "active"
                                            : isPending
                                                ? isDarkmode ? "pending-dark" : "pending"
                                                : ""
                                    }
                                >
                                    <img src={acceptedRequestsIcon} alt="Accepted requests Icon" /><span>Accepted Permits</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={`RequestsHistory/`}
                                    className={({ isActive, isPending }) =>
                                        isActive
                                            ? isDarkmode ? "active-dark" : "active"
                                            : isPending
                                                ? isDarkmode ? "pending-dark" : "pending"
                                                : ""
                                    }
                                >
                                    <img src={requestsHistoryIcon} alt="requests history Icon" /><span>Permits History</span>
                                </NavLink>
                            </li>
                        </>
                    }

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
                    <li>
                        <NavLink
                            to={"notifications/"}
                            className={({ isActive, isPending }) =>
                                isActive
                                    ? isDarkmode ? "active-dark" : "active"
                                    : isPending
                                        ? isDarkmode ? "pending-dark" : "pending"
                                        : ""
                            }
                        >
                            <img src={notificationIcon} alt="notifications Icon" /><span>Notifications
                                {
                                    notificationsCounter > 0 && <div
                                        style={{
                                            borderRadius: '30px',
                                            backgroundColor: 'red',
                                            color: 'white',
                                            height: '20px',
                                            width: '20px',
                                            lineHeight: '0.5rem',
                                            display: 'inline-flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginLeft: '10px',
                                        }}
                                    >{notificationsCounter}</div>}</span>
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
                        onChange={() => {
                            dispatch(toggle());
                        }
                        }
                    />
                </div>

                <div >
                    <button className="logout--button"
                        onClick={logout}
                        style={{
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