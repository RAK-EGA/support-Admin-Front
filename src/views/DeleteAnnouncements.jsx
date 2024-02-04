import { redirect } from "react-router-dom";
import { logoutInAction } from "../components/Auth"
import { deletereq } from "../helper functions/helperFunctions";
import { addMessage } from '../features/messages/messagesSlice';
import store from '../store';
export async function action({ request }) {
    const data = Object.fromEntries(await request.formData());

    const obj = {
        announcementIDs: JSON.parse(data.first),
    }

    const [announce, error] = await deletereq('/support/deleteAnnouncements', obj);

    if (error)
        throw error;
    if (announce.status == '401') {
        return logoutInAction();
    }
    const s = obj.announcementIDs.length > 1 ? 's' : ''
    store.dispatch(addMessage(`Annoucement${s} Deleted Succesfully`));

    // send array to be deleted
    return redirect("/announcements/");
}