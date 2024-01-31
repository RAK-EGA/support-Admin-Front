import { redirect } from "react-router-dom";
import { get, put } from "../helper functions/helperFunctions";

// idk if this works or not well check when we do shit
export async function action({ request }) {
    const data = Object.fromEntries(await request.formData());

    const [res, error] = await get("/support/viewPermit/", data.id);

    if (error)
        throw error;
    if (res.status == '401') {
        return redirect('/signIn');
    }


    const request_obj = res.data;

    const [res2, error2] = await put(`support/dispatchPermittothirdparty/${data.id}`, request_obj);
    // let announcements;
    if (error2)
        throw error2;
    if (res2.status == '401') {
        return redirect('/signIn');
    }    // `/tickets/${data.id}` maybe redirect instead and make it so its back to the list
    return redirect(`/AcceptedRequests`);
}