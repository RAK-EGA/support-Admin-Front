
import {
    Link,
    useLoaderData,
    useNavigation,
    redirect,
} from "react-router-dom"
import { useSelector } from "react-redux";


import ListItem from "../components/ListItem";
import Header from "../components/Header";
import { useEffect } from "react";
import { get } from "../helper functions/helperFunctions";

// spinner should work test it out when apis are made
export async function loader({ request }) {
    if (JSON.parse(localStorage.getItem('user')).user.type != "complaint") return redirect('/');

    const url = new URL(request.url);
    const q = url.searchParams.get("Complaints History");

    // make api call to get tickets here they com,e filtered show only

    const regex = /^[A-Za-z\u0600-\u06FF0-9 ]*$/;

    const isValid = regex.test(q);
    // leave q alone end



    // make api call to get tickets here they com,e filtered show only
    let tickets = [];

    // del me and use helper functions to do get requests


    const data = q ? (isValid ? q : "") : "";


    const mess = isValid ? null :
        <>
            <p>invalid characters used.</p>
            <p>Please only use english,arabic letters and numbers.</p>
        </>

    if (data == "" || data == null) {
        const [res, error] = await get("/support/viewcomplaintshistory");
        if (error)
            throw error;
        if (res.status == '401') {
            return redirect('/signIn');
        }
        else if (res.status == '404') {
            tickets = [];
        }
        else {
            tickets = res.data;
        }


        const status = url.searchParams.get("status");



        return { q, tickets, mess, status };
    }
    const [res, error] = await get("/support/filterTickets/", data);

    if (error)
        throw error;
    if (res.status == '401') {
        return redirect('/signIn');
    }
    else if (res.status == '404') {
        tickets = [];
    }
    else {
        tickets = res.data;
    }


    const status = url.searchParams.get("status");



    return { q, tickets, mess, status };
}


// use this when heading to view a specific ticket
// export async function action() {
//     const contact = await createContact();
//     return redirect(`/contacts/${contact.id}/edit`);
// }



export default function Tickets() {

    const { q, tickets, mess, status } = useLoaderData();

    const navigation = useNavigation();
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

    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has(
            "Complaints History"
        );

    useEffect(() => {
        document.getElementById("Complaints History").value = q;
    }, [q]);

    return (
        <>
            <Header name={"Complaints History"} searching={searching} q={q} mess={mess} />


            {/* make this a component */}
            <div className={`display--elements ${className}`}>
                {/* map to tickets here with a component  */}
                {tickets.length > 0 ? Items : <p className={className} style={
                    {
                        padding: "2rem",
                        textAlign: "center",

                    }
                }>No Complaints Found</p>}
            </div>




        </>

    );
}