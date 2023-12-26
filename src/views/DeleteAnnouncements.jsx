import { redirect } from "react-router-dom";

export async function action({ request }) {
    const data = Object.fromEntries(await request.formData());

    console.log(JSON.parse(data.first));
    // send array to be deleted
    return redirect("/announcements/");
}