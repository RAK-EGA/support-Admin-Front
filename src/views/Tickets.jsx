import {
    Form,
} from "react-router-dom"

import "../styles/tickets.css"
import Ticket from "../components/Ticket";



export default function Tickets() {



    return (
        <>

            <div className="tickets--header"><span>TICKET</span>
                <Form id="search-form" role="search">
                    <input
                        id="q"
                        // className={searching ? "loading" : ""}
                        aria-label="Search contacts"
                        type="search"
                        name="q"
                    // defaultValue={q}
                    // onChange={(event) => {
                    //     const isFirstSearch = q == null;
                    //     submit(event.currentTarget.form, {
                    //         replace: !isFirstSearch,
                    //     })
                    // }}
                    />
                    <div
                        id="search-spinner"
                        aria-hidden
                        hidden={true}
                    />
                    <div
                        className="sr-only"
                        aria-live="polite"
                    ></div>
                </Form>

                {/* add filtering */}
                {/* maybe a button that gives choices and then */}

            </div>

            {/* make this a component */}
            <div className="display--elements">
                {/* map to tickets here with a component  */}
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
                


            </div>




        </>

    );
}