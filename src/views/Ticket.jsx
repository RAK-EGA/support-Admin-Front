import {
    Form,
    useLoaderData,
    useSubmit,
} from "react-router-dom";

import Modal from "../components/Modal";
import useModal from "../customHooks/useModal";

import imgIcon from "../assets/imgIcon.png";
import Header from "../components/Header";


// spinner should work test it out when apis are made
export async function loader({ params }) {
    // make api call to get tickets here they com,e filtered show only
    // const ticket = await getTicket(.ticketIdparams);
    // console.log(params.ticketId);
    const ticket =
    {
        id: '1',
        category: 'garbage',
        location: 'RAK',
        issueDate: '18/12/2023',
        status: "resolved",
        Attachments: ["https://www.epicnonsense.com/wp-content/uploads/2013/05/d153805f768c94a3006d630caab0e178.jpg", "https://www.pio.gov.cy/coronavirus/uploads/Lorem_ipsum.pdf","https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"],
        // add data here for tickets
    }
    if (!ticket) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }

    return { ticket };
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
    // return redirect(`/tickets/${ticket.id}`);
    return "oi I DID IT"
}



export default function Ticket() {

    const { ticket } = useLoaderData();
    const { isShowing, toggle, fileInfo, setInfo } = useModal();

    const submit = useSubmit();

    let keys = [];
    for (let key in ticket) {
        if (ticket.hasOwnProperty(key)) keys.push(key);
    }
    const info = keys.map((key) => {
        if (key != 'id' && key != 'Attachments' && key != 'status') {
            return (
                <span key={key}>{key}: {ticket[key]}</span>
            );
        }
    });

    // this should be dynamic right? maybe I get the statuses from an api call?
    // maybe use fetcherform
    const status = ticket.hasOwnProperty('status') ?
        <Form method="post">
            <select name="status" id="status" defaultValue={ticket.status}
                onChange={(event) => {
                    submit(event.currentTarget.form,)
                }}>
                <option value="processing">processing</option>
                <option value="unresolved">unresolved</option>
                <option value="resolved">resolved</option>
            </select>
        </Form> : null;

    const Attachments = ticket.hasOwnProperty('Attachments') ? ticket['Attachments'].map((a) => {

        const fileName = a.split("/").at(-1)
        const type = fileName.split('.')[1] ? fileName.split('.')[1] : fileName.split(';')[0];
        return (
            // <a href={a} key={a} target={`attachment${a}`}>
            <div key={a}
            >
                <div
                    className="attachment"
                    onClick={() => {
                        setInfo(type,a);
                        toggle();
                    }}
                >
                    <img src={imgIcon} alt="documentIcon" />
                    <span>{type}</span>


                </div>


            </div>



        );
    }) : null;

    return (
        <>
            <Modal isShowing={isShowing} hide={toggle} fileInfo={fileInfo} />

            <Header name={ticket.id} allowSearch={false} />


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
                        ticket.hasOwnProperty("Attachments") &&
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