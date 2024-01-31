import {
    Link,
    useLoaderData,
    useNavigation,
    redirect
} from "react-router-dom"
import { useSelector } from "react-redux";
import { get } from "../helper functions/helperFunctions";
import ListItem from "../components/ListItem";
import Header from "../components/Header";
import { useEffect } from "react";

// spinner should work test it out when apis are made
export async function loader({ request }) {

    if (JSON.parse(localStorage.getItem('user')).user.type != "permit") return redirect('/');

    const url = new URL(request.url);
    const q = url.searchParams.get("Permits History");

    // make api call to get requests  here they com,e filtered show only
    const regex = /^[A-Za-z\u0600-\u06FF0-9 ]*$/;

    const isValid = regex.test(q);
    // leave q alone end



    // make api call to get tickets here they com,e filtered show only
    let requests = [];

    // del me and use helper functions to do get requests


    const data = q ? (isValid ? q : "") : "";


    const mess = isValid ? null :
        <>
            <p>invalid characters used.</p>
            <p>Please only use english,arabic letters and numbers.</p>
        </>

    if (data == "" || data == null) {
        const [res, error] = await get("/support/viewPermitsHistory");
        if (error)
            throw error;
        if (res.status == '401') {
            return redirect('/signIn');
        }
        else if (res.status == '404') {
            requests = [];
        }
        else {
            requests = res.data;
        }


        const status = url.searchParams.get("status");


        return { q, requests, mess, status };
    }
    const [res, error] = await get("/support/filterPermits/", data);

    if (error)
        throw error;
    if (res.status == '401') {
        return redirect('/signIn');
    }
    else if (res.status == '404') {
        requests = [];
    }
    else {
        requests = res.data;
    }


    const status = url.searchParams.get("status");



    return { q, requests, mess, status };
}


// export async function action() {
//     const contact = await createContact();
//     return redirect(`/contacts/${contact.id}/edit`);
// }
// [



export default function Requests() {
    const { q, requests, mess, status } = useLoaderData();

    const navigation = useNavigation();
    const isDarkmode = useSelector((state) => state.darkmode.value);
    const className = isDarkmode ? "dark--primary light--gray" : "";
    const Items = requests.map((request) => {
        return (

            <Link
                to={`${request._id}`}
                key={request._id}

            >
                <ListItem item={request} />
            </Link>

        );

    });

    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has(
            "Permits History"
        );

    useEffect(() => {
        document.getElementById("Permits History").value = q;
    }, [q]);

    return (

        <>
            <Header name={"Permits History"} searching={searching} q={q} mess={mess} />


            <div className={`display--elements ${className}`}>
                {requests.length > 0 ? Items : <p className={className} style={
                    {
                        padding: "2rem",
                        textAlign: "center",

                    }
                }>No Permits Found</p>}

            </div>




        </>


    );
}