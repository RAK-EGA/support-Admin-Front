import axios from "axios";
import { instance } from "./SignIn";
import { redirect } from "react-router-dom";

export async function action({ request }) {
    const data = Object.fromEntries(await request.formData());
    // const user = localStorage.getItem("user");
    // if (user === null) {
    //     return redirect('/signIn')
    // }
    // const userobj = JSON.parse(user);
    // const a = instance(userobj.accessToken);

    // // let announcements;


    // const obj = {
    //     announcementIDs: JSON.parse(data.first),
    // }
    // console.log(obj);

    // const announce = await a.delete('/support/deleteAnnouncements', {
    //     validateStatus: function (status) {
    //         // if this function returns true, exception is not thrown, so
    //         // in simplest case just return true to handle status checks externally.
    //         return true;
    //     },
    //     data: obj
    // });

    // if (announce.status == '401') {
    //     return redirect('/signIn');
    // }
    // // in side the function  of calidate status return true only if status 401 else catch error
    // else if (announce.status != '200') {
    //     throw "network error;"
    // }
    // send array to be deleted
    return redirect("/announcements/");
}