import {
    Link,
    useLoaderData,
    redirect

} from "react-router-dom"
import { useSelector } from "react-redux";

import ListItem from "../components/ListItem";
import Header from "../components/Header";
import { get } from "../helper functions/helperFunctions";

// spinner should work test it out when apis are made
export async function loader() {

    if (JSON.parse(localStorage.getItem('user')).user.type != "permit") return redirect('/');

    // make api call to get requests  here they com,e filtered show only
    const [res, error] = await get("/support/viewAssignedPermits");
    if (error)
        throw error;
    if (res.status == '401') {
        return redirect('/signIn');
    }

    const requests = res.data;
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
            <Header name={"Unviewed Permits"} allowSearch={false} />


            <div className={`display--elements ${className}`}>
                {requests.length > 0 ? Items : <p className={className} style={
                    {
                        padding: "2rem",
                        textAlign: "center",

                    }
                }>No Unviewed Permits</p>}
            </div>




        </>


    );
}