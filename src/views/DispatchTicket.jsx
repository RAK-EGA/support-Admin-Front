import { redirect } from "react-router-dom";
import { get, put } from "../helper functions/helperFunctions";
import { logoutInAction } from "../components/Auth"
import { addMessage } from '../features/messages/messagesSlice';
import store from '../store';
// idk if this works or not well check when we do shit
export async function action({ request }) {
    const data = Object.fromEntries(await request.formData());

    const [res, error] = await get("/support/viewTicket/", data.id);

    if (error)
        throw error;
    if (res.status == '401') {
        return logoutInAction();
    }


    const ticket = res.data;

    const [res2, error2] = await put(`support/dispatchtothirdparty/${data.id}`, ticket);
    // let announcements;
    if (error2)
        throw error2;
    if (res2.status == '401') {
        return logoutInAction();
    }    // `/tickets/${data.id}` maybe redirect instead and make it so its back to the list
    store.dispatch(addMessage(`Ticket Dispatched Succesfully`));

    return redirect(`/AcceptedTickets`);
}