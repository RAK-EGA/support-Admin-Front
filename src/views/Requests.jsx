import {
    Link,
    useLoaderData,
    useNavigation,


} from "react-router-dom"

import ListItem from "../components/ListItem";
import Header from "../components/Header";
import { useEffect } from "react";

// spinner should work test it out when apis are made
export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("Requests");
    console.log(`here is your query I will filter the tickets with it eventually I promise
    q = ${q}`);
    // make api call to get requests  here they com,e filtered show only
    const requests = [
        {
            id: '1',
            category: 'garbage',
            location: 'RAK',
            date: '18/12/2023',
            status: "resolved"
        },
        {
            id: 2,
            category: 'garbage',
            location: 'RAK',
            date: '18/12/2023',
            status: "unresolved"
        },
        {
            id: 3,
            category: 'garbage',
            location: 'RAK',
            date: '18/12/2023',
            status: "processing"
        },
        {
            id: 4,
            category: 'garbage',
            location: 'RAK',
            date: '18/12/2023',
            status: "processing"
        },
        {
            id: 5,
            category: 'garbage',
            location: 'RAK',
            date: '18/12/2023',
            status: "processing"
        },
        {
            id: 6,
            category: 'garbage',
            location: 'RAK',
            date: '18/12/2023',
            status: "resolved"
        },
        {
            id: 7,
            category: 'garbage',
            location: 'RAK',
            date: '18/12/2023',
            status: "resolved"
        },
        {
            id: 8,
            category: 'garbage',
            location: 'RAK',
            date: '18/12/2023',
            status: "unresolved"
        },
        {
            id: 9,
            category: 'garbage',
            location: 'RAK',
            date: '18/12/2023',
            status: "unresolved"
        },
        {
            id: 10,
            category: 'garbage',
            location: 'RAK',
            date: '18/12/2023',
            status: "unresolved"
        },

    ]
    return { q, requests };
}


// export async function action() {
//     const contact = await createContact();
//     return redirect(`/contacts/${contact.id}/edit`);
// }



export default function Requests() {
    const { q, requests } = useLoaderData();
    const navigation = useNavigation();

    const Items = requests.map((request) => {
        return (

            <Link
                to={`${request.id}`}
                key={request.id}

            >
                <ListItem item={request} />
            </Link>

        );

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


            <div className="display--elements">
                {Items}

            </div>




        </>


    );
}