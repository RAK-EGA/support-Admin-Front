import { redirect } from "react-router-dom";
import { get, put } from "../helper functions/helperFunctions";
import { logoutInAction } from "../components/Auth"
import { addMessage } from '../features/messages/messagesSlice';
import store from '../store';


export async function action({ request }) {
    const data = Object.fromEntries(await request.formData());

    const [res, error] = await get("/support/viewPermit/", data.id);

    if (error)
        throw error;
    if (res.status == '401') {
        return logoutInAction();
    }


    const request_obj = res.data;

    const [res2, error2] = await put(`support/dispatchPermittothirdparty/${data.id}`, request_obj);
    // let announcements;
    if (error2)
        throw error2;
    if (res2.status == '401') {
        return logoutInAction();
    }    

    store.dispatch(addMessage(`Request Dispatched Succesfully`));
    return redirect(`/AcceptedRequests`);
}