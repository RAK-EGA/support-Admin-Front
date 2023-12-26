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
    console.log(`here is your query I will filter the Requests with it eventually I promise
    q = ${q}`);
    // make api call to get requests  here they com,e filtered show only
    const createRequests = () => {
        const reqs = []
        for (let i = 1; i < 11; i++) {
            const rand = Math.floor(Math.random()*3)+1
            reqs.push(
                {
                    id: `${i}`,
                    category: 'garbage',
                    location: 'RAK',
                    date: '18/12/2023',
                    status: rand==1?"opened": rand==2?"proccessing": "closed",
                    // add data here for tickets
                },

            );

        }
        return reqs;
    };
    const requests = createRequests();
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