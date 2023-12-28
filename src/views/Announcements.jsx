import {
    Link,
    useLoaderData,
    useNavigation,
    Form,
    redirect,
    useSubmit,


} from "react-router-dom"

import Header from "../components/Header";
import { useEffect, useState } from "react";

import "../styles/announcements.css"

import { instance } from "./SignIn";

// spinner should work test it out when apis are made
export async function loader({ request }) {
    // throw 1;
    // const user = localStorage.getItem("user");
    // if (user === null) {
    //     return redirect('/signIn')
    // }
    // const userobj = JSON.parse(user);
    
    // const a = instance(userobj.accessToken);


    
    // leave q alone
    const url = new URL(request.url);
    const q = url.searchParams.get("Announcements");
    console.log(`here is your query I will filter the Announcements with it eventually I promise
    q = ${q}`);
    // leave q alone end


    // // make api call to get tickets here they com,e filtered show only
    // let announcements;

    // const announce = await a.get('/support/viewAnnouncements', {
    //     validateStatus: function (status) {
    //         // if this function returns true, exception is not thrown, so
    //         // in simplest case just return true to handle status checks externally.
    //         return true;
    //     }
    // });


    // announcements = announce.data.announcements;

    // if (announce.status == '401') {
    //     return redirect('/signIn');
    // }
    // // in side the function  of calidate status return true only if status 401 else catch error
    // else if (announce.status != '200') {
    //     throw "network error;"
    // }




    const announcements = [
        {
            id: 1,
            title: 'Possible Water Outage',
            body: 'Between 11:00 AM to 5:00 PM CST expect a complete water outage at Al Rifa Area, Exit No.129, Sheikh Mohammed Bin Zayed Road, P.O Box 5300',
        },
        {
            id: 2,
            title: 'Real estate trading',
            body: 'Statistical Reports of real estate trading in RAK shows that there is increasing in the acquisition rate by 20% since his highness signed a document for encouraging the young citizens to buy real estates at lower prices',
        },
        {
            id: 3,
            title: 'Green Garden',
            body: 'check out the latest news about green garden project announced by his glorified highness to make ras al khaima a better place',
        },
        {
            id: 4,
            title: 'New Hospitals issued',
            body: 'His highness opened Mohamed ibn zaid  hospital in rak in cordinnace of enhancing the public health field ',
        },
        {
            id: 5,
            title: 'Lorem ipsum dolor',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Turpis egestas pretium aenean pharetra magna ac. Nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Et netus et malesuada fames.',

        },
        {
            id: 6,
            title: 'Lorem ipsum dolor',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Turpis egestas pretium aenean pharetra magna ac. Nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Et netus et malesuada fames.',

        },
        {
            id: 7,
            title: 'Lorem ipsum dolor',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Turpis egestas pretium aenean pharetra magna ac. Nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Et netus et malesuada fames.',

        },
        {
            id: 8,
            title: 'Lorem ipsum dolor',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Turpis egestas pretium aenean pharetra magna ac. Nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Et netus et malesuada fames.',
        }

    ]

    return { q, announcements };
}


export async function action() {
    // create new announcement and redirect to edit page for that announcement
    const announce = {
        id: 420,
    }
    console.log(announce.id);
    // const announce = await createAnnounce();
    return redirect(`/announcements/${announce.id}/edit`);
}



export default function Announcements() {
    const [selectedIds, setSelected] = useState([]);
    const submit = useSubmit();
    console.log(selectedIds);
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
    function handleSubmit() {
        setSelected([]);
    }

    const Items = announcements.map((announcement) => {
        return (
            <div
                key={announcement._id}
            >

                {/* this changes */}
                <div className="announcement">
                    <input type="checkbox" name="" id=""
                        onChange={() => {
                            handleChange(announcement._id);
                        }}
                    />
                    <Link
                        to={`${announcement._id}`}
                        style={{
                            textDecoration: 'none',
                        }}

                    >
                        <div className="announcement--info">
                            <h6>{announcement.title}</h6>
                            <p>{announcement.body}</p>

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
                {announcements.length > 0 ? Items : <div className="no--announcements"><p>No Announcements</p></div>}

            </div>
            <div className="forms--holder">
                <Form
                    action="delete"
                    method="post"

                    onSubmit={(event) => {
                        if (
                            !confirm(
                                "Please confirm you want to delete the selected records.")
                        ) {

                            event.preventDefault();
                        } else{
                            handleSubmit();
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
                    <button
                        type="submit"
                    >
                        Delete
                    </button>
                </Form>
                <Form
                    method="post"
                >
                    <button type="submit">Add</button>

                </Form>

            </div>

        </>
    );
}