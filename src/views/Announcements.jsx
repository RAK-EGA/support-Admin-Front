import {
    Link,
    useLoaderData,
    useNavigation,
    Form,


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
            title: 'Possible Water Outage',
            description: 'Between 11:00 AM to 5:00 PM CST expect a complete water outage at Al Rifa Area, Exit No.129, Sheikh Mohammed Bin Zayed Road, P.O Box 5300',
        },
        {
            id: 2,
            title: 'Real estate trading',
            description: 'Statistical Reports of real estate trading in RAK shows that there is increasing in the acquisition rate by 20% since his highness signed a document for encouraging the young citizens to buy real estates at lower prices',
        },
        {
            id: 3,
            title: 'Green Garden',
            description: 'check out the latest news about green garden project announced by his glorified highness to make ras al khaima a better place',
        },
        {
            id: 4,
            title: 'New Hospitals issued',
            description: 'His highness opened Mohamed ibn zaid  hospital in rak in cordinnace of enhancing the public health field ',
        },
        {
            id: 5,
            title: 'Lorem ipsum dolor',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Turpis egestas pretium aenean pharetra magna ac. Nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Et netus et malesuada fames.',

        },
        {
            id: 6,
            title: 'Lorem ipsum dolor',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Turpis egestas pretium aenean pharetra magna ac. Nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Et netus et malesuada fames.',

        },
        {
            id: 7,
            title: 'Lorem ipsum dolor',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Turpis egestas pretium aenean pharetra magna ac. Nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Et netus et malesuada fames.',

        },
        {
            id: 8,
            title: 'Lorem ipsum dolor',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Turpis egestas pretium aenean pharetra magna ac. Nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Et netus et malesuada fames.',
        }

    ]

    return { q, announcements };
}


export async function action() {
    // create new announcement and redirect to edit page for that announcement
    const announce={
        id:420,
    }
    // const announce = await createAnnounce();
    return redirect(`/announcements/${announce.id}/edit`);
}



export default function Announcements() {
    const [selectedIds, setSelected] = useState([]);
    const { q, announcements } = useLoaderData();
    const navigation = useNavigation();
    // console.log(JSON.stringify(selectedIds));
    function handleChange(id) {
        if (selectedIds.indexOf(id) == -1) {

            setSelected((oldSelected) => [...oldSelected, id]);
        }
        else {

            setSelected((oldSelected) => {
                return oldSelected.filter((element) => element != id);

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
            <div className="forms--holder">
                <Form
                    action="delete"
                    method="post"

                    onSubmit={(event) => {
                        if (
                            !confirm(
                                "Please confirm you want to delete the selected records."
                            )
                        ) {
                            event.preventDefault();
                        }
                    }}


                >
                    <input
                        placeholder="list"
                        type="text"
                        name="first"
                        readOnly={true}
                        hidden={true}
                        value={JSON.stringify(selectedIds)}
                    />
                    <button type="submit">Delete</button>
                </Form>
                <Form
                    action="post"
                >
                    <button type="submit">Add</button>

                </Form>

            </div>

        </>
    );
}