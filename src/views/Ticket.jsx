import {
    Form,
    useLoaderData,
    redirect,
} from "react-router-dom";

import Modal from "../components/Modal";
import useModal from "../customHooks/useModal";

import imgIcon from "../assets/imgIcon.png";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { put, get, post } from "../helper functions/helperFunctions";

// spinner should work test it out when apis are made
export async function loader({ params }) {

    // }
    if (JSON.parse(localStorage.getItem('user')).user.type != "complaint") return redirect('/');

    const [res, error] = await get("/support/viewTicket/", params.ticketId);
    // use ticket to call for urls
    // /documents/document/generate-urls
    // post body 
    // {
    // images: ['name']
    // }
    if (error)
        throw error;
    if (res.status == '401') {
        return redirect('/signIn');
    }




    const attachmentPromises = res.data["additional_fields"].map(async (field) => {
        if (field.field_name === 'Attachments') {
            const [res, error] = await post('/documents/document/generate-urls', {
                images: [field.value],
            })

            if (error)
                throw error;
            if (res.status == '401') {
                return redirect('/signIn');
            }
            field.value = res.data.generatedURLs[0];
        }

        return field
    });

    await Promise.all(attachmentPromises);
    const ticket = res.data;

    return { ticket };

    // use ticket to call for urls
    // /documents/document/generate-urls
    // post body 
    // {
    // images: ['name']
    // }
}


// I am not using this yet I could either make it accept/reject here or do it another way okie
//  i will need to add a form  will figure it our morrow for now looks
export async function action({ request, }) {
    // call endpoint to change status rediret to same page
    const data = Object.fromEntries(await request.formData());

    const choice = { choice: data.choice }

    const [res, error] = await put(`/support/acceptRejectTicket/${data.id}`, choice);

    if (error)
        throw error;
    if (res.status == '401') {
        return redirect('/signIn');
    }

    return redirect(`/tickets`);
}



export default function Ticket() {

    // maybe also load data for here and pass it somehow throu modal maybe add new state 
    const { ticket } = useLoaderData();
    const { isShowing, toggle, fileInfo, setInfo } = useModal();
    const additional_fields = ticket["additional_fields"];
    const isDarkmode = useSelector((state) => state.darkmode.value);
    const className = isDarkmode ? "dark--primary light--gray" : "";


    let keys = [];
    for (let key in ticket) {
        keys.push(key);
    }

    const info = keys.map((key, _, i) => {
        if (key != '_id' && key != 'additional_fields' && key != '__v' && key != 'assignedTo') {
            return (
                <span className={className} key={key + i}>{key}: {ticket[key].toString()}</span>
            );
        }
    });


    const fields = additional_fields.filter((obj) => {
        if (obj.field_name === 'Attachments') {
            return false
        }
        return true
    });

    const fieldsInfo = fields.map((key, _, i) => {
        return (
            <span className={className} key={key.value + i + key.field_name}>{key.field_name}: {key.value.toString()}</span>
        );

    });

    const fieldsAttachments = additional_fields.filter((obj) => {
        if (obj.field_name !== 'Attachments') {
            return false
        }
        return true
    });

    // this should be dynamic right? maybe I get the statuses from an api call?
    // maybe use fetcherform


    const Attachments = (fieldsAttachments.length) > 0 ? fieldsAttachments.map((attachment, _, i) => {

        const fileName = attachment.value;
        const type = attachment.field_type;
        return (
            // <a href={a} key={a} target={`attachment${a}`}>
            <div key={fileName + i + type}
            >
                <div
                    className="attachment"
                    onClick={() => {
                        setInfo(type, fileName);
                        toggle();
                    }}
                >
                    <img src={imgIcon} alt="documentIcon" />
                    <span>{`${type}`}</span>


                </div>


            </div>



        );
    }) : null;

    return (
        <>
            <Modal isShowing={isShowing} hide={toggle} fileInfo={fileInfo} />

            <Header name={ticket._id} allowSearch={false} />


            {/* make this a component */}
            <div className={`display--elements ${className}`}>
                {/* map to tickets here with a component  */}
                <div className="ticket" style={{
                    display: "flex",
                }}>
                    <div className="ticket--info">
                        {info}

                    </div>
                    <div className="ticket--info">
                        {fieldsInfo}
                    </div>
                </div>
                {
                    (fieldsAttachments.length) > 0 &&
                    <>

                        <div className="ticket--info">
                            <span className={className}>Attachments:</span>
                            <div className="attachments--holder">
                                {Attachments}
                            </div>
                        </div>

                    </>

                }
                {
                    /* form or add a function and it goes to the action redirect? */
                    /* tbh i dont want to add a form cause a form will mean i gotta add action then intent*/
                    /* so lets tru onclick functions for now okie?*/
                    ticket.status === "OPEN" &&
                    <div className="buttons--holder">

                        <Form method="post">
                            <input type="text" hidden name="choice" value="reject" readOnly></input>
                            <input type="text" hidden readOnly value={ticket._id} name="id"></input>

                            <button className="button">Reject</button>
                        </Form>
                        <Form method="post">
                            <input type="text" hidden name="choice" value="accept" readOnly></input>
                            <input type="text" hidden readOnly value={ticket._id} name="id"></input>

                            <button className="button">Accept</button>
                        </Form>

                    </div>
                }
                {
                    ticket.status === "VIEWED_BY_STAFF" &&
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        marginBottom: '1rem',
                    }}>
                        <button className="button"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center',
                            }}
                            onClick={
                                () => {
                                    setInfo("Accept", ticket._id);
                                    toggle();
                                }
                            }
                        >Dispatch</button>
                    </div>
                }
            </div>




        </>
    );
}