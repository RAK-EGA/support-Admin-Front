/* eslint-disable no-prototype-builtins */
/* eslint-disable react-refresh/only-export-components */
import {
    Form,
    useLoaderData,
    redirect,
} from "react-router-dom"
import { useSelector } from "react-redux";
import { get, put, post } from "../helper functions/helperFunctions";
import Modal from "../components/Modal";
import useModal from "../customHooks/useModal";

import imgIcon from "../assets/imgIcon.png"
import Header from "../components/Header";
import { logoutInAction } from "../components/Auth"
import { addMessage } from '../features/messages/messagesSlice';
import store from '../store';

export async function loader({ params }) {
    if (JSON.parse(localStorage.getItem('user')).user.type != "permit") return redirect('/');
    const [res, error] = await get("/support/viewPermit/", params.requestId);
    if (error)
        throw error;
    if (res.status == '401') {
        return logoutInAction();
    }
    const attachmentPromises = res.data["serviceDetails"].map(async (field) => {
        if (field.field_type === 'document') {
            const [res, error] = await post('/documents/document/generate-urls', {
                images: [field.value],
            })

            if (error)
                throw error;
            if (res.status == '401') {
                return logoutInAction();
            }
            field.value = res.data.generatedURLs[0];
        }

        return field
    });

    await Promise.all(attachmentPromises);
    const request = res.data;

    return { request };
}


export async function action({ request, }) {
    const data = Object.fromEntries(await request.formData());

    const choice = { choice: data.choice }

    const [res, error] = await put(`/support/acceptRejectPermit/${data.id}`, choice);

    if (error)
        throw error;
    if (res.status == '401') {
        return redirect('/signIn');
    }

    const f = data.choice == 'accept' ? "Accepted" : "Rejected"
    store.dispatch(addMessage(`Request ${f} Succesfully`));

    return redirect(`/requests`);
}


export default function Request() {
    const { request } = useLoaderData();
    const { isShowing, toggle, fileInfo, setInfo } = useModal();
    const isDarkmode = useSelector((state) => state.darkmode.value);
    const className = isDarkmode ? "dark--primary light--gray" : "";

    let keys = [];
    for (let key in request) {
        keys.push(key);
    }
    const info = keys.map((key) => {
        if (key != '_id' && key != 'Attachments' && key != 'serviceDetails' && key != '__v' && key != 'assignedTo') {
            return (
                <span className={className} key={key}>{key}: {request[key].toString()}</span>
            );
        }
    });

    // this should be dynamic right? maybe I get the statuses from an api call?
    // maybe use fetcherform


    const Attachments = request.hasOwnProperty('serviceDetails') ? request['serviceDetails'].map((service) => {


        return (
            // <a href={a} key={a} target={`attachment${a}`}>

            service.field_type == "document" &&
            <div key={service.value + service.document_type}
            >
                <div
                    className="attachment"
                    onClick={() => {
                        setInfo(service.document_type, service.value);
                        toggle();
                    }}
                >
                    <img src={imgIcon} alt="documentIcon" />
                    <span>{service.document_type}</span>


                </div>



            </div>




        );
    }) : null;


    const extract_keys = (object) => {
        let keys = []
        for (let key in object) {

            if (key != "condition") keys.push(key)
        }
        return keys
    }
    const extract_data_from_object = (keys, object) => {
        return keys.map((key) => {

            return (<li key={key}><span className={className}>{key}: {object[key].toString()}</span></li>)
        });

    }
    const extract_objects_from_object = (objects_key_arr, parent_object) => {
        return objects_key_arr.map((key) => {
            return (
                <div key={key}>
                    <span className={className}>{key}:</span>
                    <ul className={className} style={{
                        listStyle: 'inside',
                        marginLeft: '1rem',

                    }}>
                        {extract_data_from_object(extract_keys(parent_object[key]), parent_object[key])}
                    </ul>


                </div>
            );
        });
    }

    const serviceDetails = request.hasOwnProperty('serviceDetails') ? request['serviceDetails'].map((service) => {


        const AI_fields_keys = service.is_ai_compatible ? extract_keys(service.AI_fields) : null;
        const AI_data = service.is_ai_compatible ? extract_objects_from_object(AI_fields_keys, service.AI_fields) : null;


        return (
            <div key={service.field_name} className="service--details" style={
                {
                    display: 'flex',
                    flexDirection: 'column'
                }
            }>

                <>
                    <span className={className}>Field Name : {service.field_name.toString()}</span>
                    {
                        service.field_type == "document" &&
                        <>
                            <span className={className}>Document Type: {service.document_type.toString()}</span>
                            {
                                service.is_ai_compatible ? <>{AI_data}</> : null
                            }


                        </>
                    }
                    {
                        service.field_type !== "document" && <span className={className}>value: {service.value.toString()}</span>
                    }


                </>


            </div>
        );
    }) : null;


    return (
        <>
            <Modal isShowing={isShowing} hide={toggle} fileInfo={fileInfo} />

            <Header name={request._id} allowSearch={false} />


            {/* make this a component */}
            <div className={`display--elements ${className}`}>
                {/* map to tickets here with a component  */}
                <div className="ticket--info">
                    {info}
                    {
                        request.hasOwnProperty("serviceDetails") &&
                        <>
                            <span className={className}>Service Details:</span>
                            <div className="attachments--holder" style={{
                                color: '#6E6893',
                                marginTop: '0.1rem',
                            }}>
                                {serviceDetails}
                            </div>

                        </>
                    }
                    {
                        Attachments &&
                        <>
                            <span className={className}>Attachments:</span>
                            <div className="attachments--holder">
                                {Attachments}
                            </div>

                        </>
                    }
                </div>
                {
                    /* form or add a function and it goes to the action redirect? */
                    /* tbh i dont want to add a form cause a form will mean i gotta add action then intent*/
                    /* so lets tru onclick functions for now okie?*/
                    request.status === "OPEN" &&
                    <div className="buttons--holder">

                        <Form method="post">
                            <input type="text" hidden name="choice" value="reject" readOnly></input>
                            <input type="text" hidden readOnly value={request._id} name="id"></input>

                            <button className="button">Reject</button>
                        </Form>
                        <Form method="post">
                            <input type="text" hidden name="choice" value="accept" readOnly></input>
                            <input type="text" hidden readOnly value={request._id} name="id"></input>

                            <button className="button">Accept</button>
                        </Form>
                    </div>

                }
                {
                    request.status === "VIEWED_BY_STAFF" &&
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
                                    setInfo("Accept", request._id);
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