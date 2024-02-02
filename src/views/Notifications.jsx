import {
    useLoaderData,
    redirect,
} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";


import Header from "../components/Header";

import "../styles/announcements.css"
import { get } from "../helper functions/helperFunctions";
import { add } from "../features/notifications/notificationsSlice";
import { logoutInAction } from "../components/Auth";

export async function loader() {
    // throw 1;

    let notifications
    const [res, error] = await get('/support/viewnotifications');
    if (error)
        throw error;
    if (res.status == '401') {
        return logoutInAction();
    }
    else if (res.status == '404') {
        notifications = [];
    }
    else {
        notifications = res.data;
    }


    return { notifications };
}






export default function Notifications() {
    const { notifications } = useLoaderData();
    const isDarkmode = useSelector((state) => state.darkmode.value);
    const className = isDarkmode ? "dark--first" : "";
    const dispatch = useDispatch();
    dispatch(add(0));
    const Row = (noti) => {
        const color = noti.status === "RESOLVED" ? "green" : noti.status === "OPEN" ? "red" : "gray"
        const pointFill = color == "green" ? "#007F00" : color == "red" ? "#D30000" : "#767676"

        return (
            <div key={noti._id} className={`notification ${className}`}>
                <div className="item--info">
                    <div className="item--id">
                        <span className={className}>{noti.ticketID}</span>
                    </div>
                    <div className="item--category">
                        <span className={className}>{noti.type === "permit" ? `Service Name: ${noti.serviceName}` : `Category: ${noti.category}`}</span>
                    </div>
                </div>
                <div className="item--date">
                    <span className={className}>Issued on</span>
                    <span className={className}>{noti.createdAt}</span>
                </div>
                <div className="item--date">
                    <span className={className}>Exceeded SLA by</span>
                    <span className={className}>{noti.slaExceedTime} h</span>
                </div>
                <div className="item--status">
                    {/* i dont know maybe look for an icont I instead? OR just keep it and change the fill Color so that it changes with status */}
                    {/* depending on the props.status I give span class either red blue or green and I also change the fill according to it */}

                    {/* 
                         color: #007F00;    green
                         color: #D30000;    red 
                         color: #4A4AFF;    blue
                         color: #767676: gray
                     */}
                    <span className={`status--holder ${color}`}>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="4.43859" cy="3.66666" rx="3.53948" ry="3.5" fill={pointFill} />
                        </svg>
                        {noti.status}
                    </span>

                </div>
            </div>
        );
    }
    const Items = notifications.map((noti) => {
        return Row(noti)
    });
    return (
        <>
            <Header name={"Notifications"} allowSearch={false} />

            <div className="announcements--containter">
                {notifications.length > 0 ?
                    Items
                    :
                    <div className="no--announcements"><p className={isDarkmode ? "light--gray" : ""} style={
                        {
                            padding: "2rem",
                            textAlign: "center",

                        }
                    }>No Notifications</p></div>}
            </div>

        </>
    );

}