import {
    Link,
    useLoaderData,
    useNavigation,


} from "react-router-dom"

import ListItem from "../components/ListItem";
import Header from "../components/Header";
import { useEffect, useState } from "react";

import "../styles/announcements.css"

// spinner should work test it out when apis are made
export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("Announcements");
    console.log(`here is your query I will filter the tickets with it eventually I promise
    Announcements = ${q}`);
    // make api call to get tickets here they com,e filtered show only

    const announcements = [
        {
            id: 1,
            title: 'test',
            description: 'description test',
        },
        {
            id: 2,
            title: 'test',
            description: 'description test',
        },
        {
            id: 3,
            title: 'test',
            description: 'description test',
        },
        {
            id: 4,
            title: 'test',
            description: 'description test',
        },
        {
            id: 5,
            title: 'test',
            description: 'description test',
        },
        {
            id: 6,
            title: 'test',
            description: 'description test',
        },
        {
            id: 7,
            title: 'test',
            description: 'description test',
        },
        {
            id: 8,
            title: 'test',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Turpis egestas pretium aenean pharetra magna ac. Nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Et netus et malesuada fames.',
        }

    ]

    return { q, announcements };
}


// use this when heading to view a specific ticket
// export async function action() {
//     const contact = await createContact();
//     return redirect(`/contacts/${contact.id}/edit`);
// }



export default function Announcements() {
    const [selectedIds, setSelected] = useState([]);
    const { q, announcements } = useLoaderData();
    const navigation = useNavigation();

    function handleChange(id) {
        if (selectedIds.indexOf(id) == -1) {

            setSelected((oldSelected) => [...oldSelected, id]);
        }
        else {

            setSelected((oldSelected) => {
                return oldSelected.filter((element)=>element!=id);

            });

        }

    }

    const Items = announcements.map((announcement) => {
        return (
            <div
                key={announcement.id}
            >

                {/* this changes */}
                <div className="announcement">
                    <input type="checkbox" name="" id=""
                        onChange={() => {
                            handleChange(announcement.id);
                        }}
                    />
                    <Link
                        to={`${announcement.id}`}
                        style={{
                            textDecoration: 'none',
                        }}

                    >
                        <div className="announcement--info">
                            <h6>{announcement.title}</h6>
                            <p>{announcement.description}</p>

                        </div>
                    </Link>

                </div>

            </div >

        );

    });



    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has(
            "Announcements"
        );

    useEffect(() => {
        document.getElementById("Announcements").value = q;
    }, [q]);

    return (
        <>

            <Header name={"Announcements"} searching={searching} q={q} />

            <div className="announcements--containter">
                {Items}

            </div>

        </>
    );
}