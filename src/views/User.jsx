import {
    Link,
    useLoaderData,
    useNavigation,
    Form,
    redirect,


} from "react-router-dom"

import Header from "../components/Header";
import { useEffect, useState } from "react";

import "../styles/users.css"

import profileImage from "../assets/profile.png"




export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("Users");
    console.log(`here is your query I will filter the Users with it eventually I promise
    q = ${q}`);
    // make api call to get requests  here they com,e filtered show only
    const creatUsers = () => {

        const users = []
        for (let i = 1; i < 11; i++) {
            users.push(
                {
                    id: `${i}`,
                    username: `user${i}`,
                    location: 'RAK',
                    firstName: `userFirstname${i}`,
                    lastName: `userlastname${i}`,
                    nationalId: "1234566785454",
                    password: "fakepasword wont show u",

                }

            );

        }
        return users;

    }


    const users = creatUsers()


    return { q, users };
}


export async function action() {
    // create new announcement and redirect to edit page for that announcement
    const user = {
        id: 420,
    }
    console.log(user.id);
    // const announce = await createAnnounce();
    return redirect(`/users/${user.id}/edit`);
}


export default function Users() {


    const [selectedIds, setSelected] = useState([]);
    const { q, users } = useLoaderData();
    const navigation = useNavigation();

    const Items = users.map((user) => {
        return (


            <div className="user--container" key={user.id}>
                <Link
                    to={`${user.id}`}
                    style={{
                        textDecoration: 'none',
                    }}

                >

                    <div className="info--container">
                        <img src={profileImage} alt="" />
                        <div className="user--info">
                            <h6>{user.username} #{user.id}</h6>
                            <span>{user.location}</span>
                        </div>

                    </div>
                </Link>

                <input type="checkbox" name="" id=""
                    onChange={() => {
                        handleChange(user.id);
                    }}
                />
            </div>



        );

    });



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

    function handleSubmit(){
        setSelected([]);
    }

    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has(
            "Users"
        );

    useEffect(() => {
        document.getElementById("Users").value = q;
    }, [q]);

    return (
        <>
            <Header name={"Users"} searching={searching} q={q} />
            <div className="display--users">
                <div className="users--holder">
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
                            } else{
                                handleChange();
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
                        method="post"
                    >
                        <button type="submit">Add</button>

                    </Form>

                </div>
            </div>





        </>
    );
}