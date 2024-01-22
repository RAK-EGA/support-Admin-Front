
import {
    Link,
    useLoaderData,
    useNavigation,
    
} from "react-router-dom"
import { useSelector } from "react-redux";


import ListItem from "../components/ListItem";
import Header from "../components/Header";
import { useEffect } from "react";

// spinner should work test it out when apis are made
export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("Tickets History");
    console.log(`here is your query I will filter the tickets with it eventually I promise
    q = ${q}`);
    // make api call to get tickets here they com,e filtered show only

    const createTickets = () => {
        const reqs = []
        for (let i = 1; i < 11; i++) {

            const rand = Math.floor(Math.random() * 3) + 1

            reqs.push(
                {
                    id: `${i}`,
                    category: 'garbage',
                    location: 'RAK',
                    date: '18/12/2023',
                    status: rand == 1 ? "opened" : rand == 2 ? "proccessing" : "closed",
                    // add data here for tickets
                },
            );
        }
        return reqs;
    };
    const tickets = createTickets();
    return { q, tickets };
}


// use this when heading to view a specific ticket
// export async function action() {
//     const contact = await createContact();
//     return redirect(`/contacts/${contact.id}/edit`);
// }



export default function Tickets() {

    const { q, tickets } = useLoaderData();
    const navigation = useNavigation();
    const isDarkmode = useSelector((state) => state.darkmode.value);
    const className = isDarkmode ? "dark--primary light--gray" : "";

    const Items = tickets.map((ticket) => {
        return (
            <Link
                to={`${ticket.id}`}
                key={ticket.id}

            >
                <ListItem item={ticket} />
            </Link>
        );

    });

    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has(
            "Tickets History"
        );

    useEffect(() => {
        document.getElementById("Tickets History").value = q;
    }, [q]);

    return (
        <>
            <Header name={"Tickets History"} searching={searching} q={q}  />


            {/* make this a component */}
            <div className={`display--elements ${className}`}>
                {/* map to tickets here with a component  */}
                {Items}

            </div>




        </>

    );
}