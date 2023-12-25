import {
    Form,
    useLoaderData,
    useNavigation,
    useSubmit,


} from "react-router-dom"

import imgIcon from "../assets/imgIcon.png"
import samplePDf from "../assets/sample.pdf"
import Header from "../components/Header";
import { useEffect } from "react";

// spinner should work test it out when apis are made
export async function loader({ params }) {
    // make api call to get tickets here they com,e filtered show only
    // const ticket = await getTicket(params.ticketId);
    // console.log(params.ticketId);
    const request =
    {
        id: '1',
        category: 'garbage',
        location: 'RAK',
        issueDate: '18/12/2023',
        status: "resolved",
        Attachments: [imgIcon, samplePDf],
        // add data here for tickets
    }
    if (!request) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }

    return { request };
}


// maybe use fetcher form to implement optimistic rendering
export async function action({ request, params }) {
    // call endpoint to change status rediret to same page
    let formData = await request.formData();
    // return updateContact(params.contactId, {
    //     favorite: formData.get("favorite") === "true",
    // });
    console.log(formData.get("status"));
    console.log("trust me I submited");
    return "oi I DID IT"
}


export default function Request() {
    const { request } = useLoaderData();
    const submit = useSubmit();

    let keys = [];
    for (let key in request) {
        if (request.hasOwnProperty(key)) keys.push(key);
    }
    const info = keys.map((key) => {
        if (key != 'id' && key != 'Attachments' && key != 'status') {
            return (
                <span key={key}>{key}: {request[key]}</span>
            );
        }
    });

    // this should be dynamic right? maybe I get the statuses from an api call?
    // maybe use fetcherform
    const status = request.hasOwnProperty('status') ?
        <Form method="post">
            <select name="status" id="status" defaultValue={request.status}
                onChange={(event) => {
                    submit(event.currentTarget.form,)
                }}>
                <option value="processing">processing</option>
                <option value="unresolved">unresolved</option>
                <option value="resolved">resolved</option>
            </select>
        </Form> : null;

    const Attachments = request.hasOwnProperty('Attachments') ? request['Attachments'].map((a) => {

        const fileName = a.split("/").at(-1)
        return (
            <a href={a} key={a} target={`attachment${a}`}>
                <div className="attachment">
                    {/* for now one Icon for all if we have time an icon for each */}
                    <img src={imgIcon} alt="documentIcon" />
                    <span>{fileName}</span>
                </div>
            </a>

        );
    }) : null;

    return (
        <>
            <Header name={request.id} allowSearch={false} />


            {/* make this a component */}
            <div className="display--elements">
                {/* map to tickets here with a component  */}
                <div className="ticket--info">
                    {info}
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                    }}>
                        status: {status}
                    </div> {
                        request.hasOwnProperty("Attachments") &&
                        <>
                            <span>Attachments:</span>
                            <div className="attachments--holder">
                                {Attachments}
                            </div>

                        </>

                    }
                </div>

            </div>




        </>
    );
}