import {
    Link,
    useLoaderData,
    useNavigation,
    Form,
    redirect,


} from "react-router-dom"

import Header from "../components/Header";
import { useEffect, useState } from "react";

import "../styles/announcements.css"

import { post } from "../helper functions/helperFunctions";
// spinner should work test it out when apis are made


export async function loader({ request, params }) {
    // throw 1;

    // leave q alone
    const url = new URL(request.url);
    const q = url.searchParams.get("Announcements");
    const regex = /^[A-Za-z\u0600-\u06FF0-9 ]*$/;

    const isValid = regex.test(q);
    // leave q alone end



    // make api call to get tickets here they com,e filtered show only
    let announcements = [];

    // del me and use helper functions to do get requests

    const data = {
        title: isValid ? q : ""
    };

    const mess = isValid ? null :
        <>
            <p>invalid characters used.</p>
            <p>Please only use english,arabic letters and numbers.</p>
        </>

    const [announce, error] = await post("/support/searchAnnouncement", data);

    if (error)
        throw error;
    if (announce.status == '401') {
        return redirect('/signIn');
    }
    else if (announce.status == '404') {
        announcements = [];
    }
    else {
        announcements = announce.data.announcements;
    }

    // const announcements = [
    //     {
    //         id: 1,
    //         title: 'Possible Water Outage',
    //         body: 'Between 11:00 AM to 5:00 PM CST expect a complete water outage at Al Rifa Area, Exit No.129, Sheikh Mohammed Bin Zayed Road, P.O Box 5300',
    //     },

    // ]

    // wont be null If being redirected
    const status = url.searchParams.get("status");
    


    return { q, announcements, mess, status };
}


export async function action() {
    // create new announcement and redirect to edit page for that announcement
    // const announce = await createAnnounce();
    return redirect(`/announcements/new/create`);
}


// use toastify tomorrow maybe its kinda of a refining feature
export default function Announcements() {
    const [selectedIds, setSelected] = useState([]);
    const { q, announcements, mess, status } = useLoaderData();

    const navigation = useNavigation();
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
        const intent = "edit";
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
                        to={`${announcement._id}/${intent}`}
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

            <Header name={"Announcements"} searching={searching} q={q} mess={mess} />

            <div className="announcements--containter">
                {announcements.length > 0 ? Items : <div className="no--announcements"><p>No Announcements</p></div>}

            </div>
            <div className="forms--holder">
                <Form
                    action="delete"
                    method="post"

                    onSubmit={(event) => {
                        if (selectedIds.length === 0) {
                            alert("Please select the Announcements you want to delete first")
                            event.preventDefault();
                        }
                        else if (
                            !confirm(
                                "Please confirm you want to delete the selected records.")
                        ) {

                            event.preventDefault();
                        } else {
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