import Header from "../components/Header";
import { get, post, put } from "../helper functions/helperFunctions";
import {
    useLoaderData,
    Form,
    redirect,


} from "react-router-dom"

import { useSelector } from "react-redux";
import { logoutInAction } from "../components/Auth"

import { addMessage } from '../features/messages/messagesSlice';
import store from '../store';

export async function loader({ params }) {
    // throw 1;
    const id = params.id;
    const intent = params.intent;

    if (id == "new") {
        const announcement = {
            _id: "new",
            title: "",
            body: "",
        };

        return { announcement, intent };
    }

    const [announce, error] = await get("/support/viewAnnouncement/", id);
    let announcement;

    if (error) {
        throw error
    }
    if (announce.status == '401') {
        return logoutInAction();
    }
    else if (announce.status == '404') {
        announcement = [];
    }
    else {
        announcement = announce.data.announcement;
    }

    return { announcement, intent };
}


export async function action({ request }) {

    // I need to check if signed in or no cause I need token i can just check if status is 401 it should come back as not an error if erro throw
    const { intent, title, body, id } = Object.fromEntries(await request.formData());
    if (intent == "create") {
        // call post announcement
        const [res, error] = await post("/support/postAnnouncement", {
            title: title,
            body: body,
        });

        if (error)
            throw error;
        if (res.status == '401') {
            return logoutInAction();
        }
        else {
            store.dispatch(addMessage(`Annoucement Created Succesfully`));

            return redirect("/announcements");
        }
    }
    else {
        // call update announcement put method needs updat in helper fucntions
        const [res, error] = await put(`/support/updateAnnouncement/${id}`, {
            title: title,
            body: body,
        });

        if (error)
            throw error;
        if (res.status == '401') {
            return logoutInAction();
        }
        else {
            store.dispatch(addMessage(`Annoucement Updated Succesfully`));
            return redirect("/announcements")
        }
    }

}

export default function EditAnnouncement() {
    const { announcement, intent } = useLoaderData();
    const isDarkmode = useSelector((state) => state.darkmode.value);
    const className = isDarkmode ? "dark--primary light--gray" : "";
    const textareaClassName = isDarkmode ? "dark--first light--gray" : "";
    return (

        <>
            <Header name={intent == "create" ? "Create Announcement" : "Edit Announcement"} allowSearch={false} />

            <div className={`display--elements ${className}`}>
                <div className="edit--form">
                    <Form method="post">

                        <input
                            type="text"
                            name="intent"
                            readOnly={true}
                            hidden={true}
                            value={intent}
                        />

                        <input
                            type="text"
                            name="id"
                            readOnly={true}
                            hidden={true}
                            value={announcement._id}
                        />
                        <label className={className} htmlFor="title">Title</label>
                        <textarea className={textareaClassName} name="title" id="title" rows="2" defaultValue={announcement.title} required></textarea>
                        <label className={className} htmlFor="body">Body</label>
                        <textarea className={textareaClassName} name="body" id="body" rows="8" defaultValue={announcement.body} required></textarea>

                        <button className="save--button" type="submit">Save</button>

                    </Form>
                </div>

            </div>


        </>
    );
}