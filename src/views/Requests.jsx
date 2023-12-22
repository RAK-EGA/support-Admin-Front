import {
    useLoaderData,
    useNavigation,


} from "react-router-dom"

import ListItem from "../components/ListItem";
import Header from "../components/Header";
import { useEffect } from "react";

// spinner should work test it out when apis are made
export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("Tickets");
    console.log(`here is your query I will filter the tickets with it eventually I promise
    q = ${q}`);
    // make api call to get tickets here they com,e filtered show only
    const tickets = [
        {
            id: '#1',
            category: 'garbage',
            location: 'your head rent free',
            date: '18/12/2023',
            status: "resolved"
            // add data here for tickets
        },
        {
            id: 2,
            category: 'garbage',
            location: 'your head rent free',
            date: '18/12/2023',
            status: "unresolved"
            // add data here for tickets
        },
        {
            id: 3,
            category: 'garbage',
            location: 'your head rent free',
            date: '18/12/2023',
            status: "processing"
            // add data here for tickets
        },
        {
            id: 4,
            category: 'garbage',
            location: 'your head rent free',
            date: '18/12/2023',
            status: "processing"
            // add data here for tickets
        },
        {
            id: 5,
            category: 'garbage',
            location: 'your head rent free',
            date: '18/12/2023',
            status: "processing"
            // add data here for tickets
        },
        {
            id: 6,
            category: 'garbage',
            location: 'your head rent free',
            date: '18/12/2023',
            status: "resolved"
            // add data here for tickets
        },
        {
            id: 7,
            category: 'garbage',
            location: 'your head rent free',
            date: '18/12/2023',
            status: "resolved"
            // add data here for tickets
        },
        {
            id: 8,
            category: 'garbage',
            location: 'your head rent free',
            date: '18/12/2023',
            status: "unresolved"
            // add data here for tickets
        },
        {
            id: 9,
            category: 'garbage',
            location: 'your head rent free',
            date: '18/12/2023',
            status: "unresolved"
            // add data here for tickets
        },
        {
            id: 10,
            category: 'garbage',
            location: 'your head rent free',
            date: '18/12/2023',
            status: "unresolved"
            // add data here for tickets
        },

    ]

    return { q, tickets };
}


// use this when heading to view a specific ticket
// export async function action() {
//     const contact = await createContact();
//     return redirect(`/contacts/${contact.id}/edit`);
// }



export default function Requests() {
    const { q, tickets } = useLoaderData();
    const navigation = useNavigation();

    const Items = tickets.map((ticket) => {
        return (<ListItem key={ticket.id} item={ticket} />);

    });

    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has(
            "Requests"
        );

    useEffect(() => {
        document.getElementById("Requests").value = q;
    }, [q]);

    return (

        <>
        <Header name={"Requests"} searching={searching} q={q} />


        {/* make this a component */}
        <div className="display--elements">
            {/* map to tickets here with a component  */}
            {Items}

        </div>




    </>


    );
}