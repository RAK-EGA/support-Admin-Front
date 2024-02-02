import {
    Link,
    useLoaderData,
    redirect

} from "react-router-dom"
import { useSelector } from "react-redux";

import ListItem from "../components/ListItem";
import Header from "../components/Header";
import { get } from "../helper functions/helperFunctions";
import { logoutInAction } from "../components/Auth";
// spinner should work test it out when apis are made
export async function loader() {

    // make api call to get requests  here they com,e filtered show only
    // should change to accepted Permit BUT WHERE IS IT
    if (JSON.parse(localStorage.getItem('user')).user.type != "permit") return redirect('/');

    const [req, error] = await get("/support/viewAcceptedPermits");

    if (error)
        throw error;
    if (req.status == '401') {
        return logoutInAction();
    }



    const requests = req.data;
    return { requests };
}





export default function Requests() {
    const { requests } = useLoaderData();
    const isDarkmode = useSelector((state) => state.darkmode.value);
    const className = isDarkmode ? "dark--primary light--gray" : "";
    const Items = requests.map((request) => {
        return (

            <Link
                to={`${request._id}`}
                key={request._id}

            >
                <ListItem item={request} />
            </Link>

        );

    });



    return (

        <>
            <Header name={"Accepted Permits"} allowSearch={false} />


            <div className={`display--elements ${className}`}>
                {requests.length > 0 ? Items : <p className={className} style={
                    {
                        padding: "2rem",
                        textAlign: "center",

                    }
                }>No Accepted Permits</p>}
            </div>




        </>


    );
}