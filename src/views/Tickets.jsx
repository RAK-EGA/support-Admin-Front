import {
    Form,
} from "react-router-dom"

import "../styles/tickets.css"



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

            </div>

        </>

    );
}