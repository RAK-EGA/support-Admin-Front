
import {
    Link,
    useLoaderData,
    redirect,

} from "react-router-dom"
import { useSelector } from "react-redux";


import ListItem from "../components/ListItem";
import Header from "../components/Header";
import { get } from "../helper functions/helperFunctions";

// spinner should work test it out when apis are made
export async function loader() {



    // make api call to get tickets here they com,e filtered show only
    // /support/viewAssignedTickets
    if (JSON.parse(localStorage.getItem('user')).user.type != "complaint") return redirect('/');

    const [req, error] = await get("/support/viewAssignedTickets");

    if (error)
        throw error;
    if (req.status == '401') {
        return redirect('/signIn');
    }

    const tickets = req.data;
    return { tickets };
}


// use this when heading to view a specific ticket
// export async function action() {
//     const contact = await createContact();
//     return redirect(`/contacts/${contact.id}/edit`);
// }



export default function Tickets() {

    const { tickets } = useLoaderData();
    const isDarkmode = useSelector((state) => state.darkmode.value);
    const className = isDarkmode ? "dark--primary light--gray" : "";

    const Items = tickets.map((ticket) => {
        return (
            <Link
                to={`${ticket._id}`}
                key={ticket._id}

            >
                <ListItem item={ticket} />
            </Link>
        );

    });

    // const searching =
    //     navigation.location &&
    //     new URLSearchParams(navigation.location.search).has(
    //         "Tickets"
    //     );

    // useEffect(() => {
    //     document.getElementById("Tickets").value = q;
    // }, [q]);

    return (
        <>
            {/* <Header name={"Tickets"} searching={searching} q={q}  /> */}
            <Header name={"Unviewed Complaints"} allowSearch={false} />


            {/* make this a component */}
            <div className={`display--elements ${className}`}>
                {/* map to tickets here with a component  */}
                {tickets.length > 0 ? Items : <p className={className} style={
                    {
                        padding: "2rem",
                        textAlign: "center",

                    }
                }>No Unviewed Complaints</p>}

            </div>




        </>

    );
}