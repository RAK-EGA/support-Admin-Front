import {
    Link,
    useLoaderData,


} from "react-router-dom"
import { useSelector } from "react-redux";

import ListItem from "../components/ListItem";
import Header from "../components/Header";

// spinner should work test it out when apis are made
export async function loader() {

    // make api call to get requests  here they com,e filtered show only
    const createRequests = () => {
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
    const requests = createRequests();
    return { requests };
}





export default function Requests() {
    const { requests } = useLoaderData();
    const isDarkmode = useSelector((state) => state.darkmode.value);
    const className = isDarkmode ? "dark--primary light--gray" : "";
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



    return (

        <>
            <Header name={"Unviewed Requests"} allowSearch={false} />


            <div className={`display--elements ${className}`}>
                {Items}

            </div>




        </>


    );
}