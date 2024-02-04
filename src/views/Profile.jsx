import Header from "../components/Header";
import { patch } from "../helper functions/helperFunctions";
import "../styles/profile.css"

import {
    Form,
} from "react-router-dom"

import { addMessage } from '../features/messages/messagesSlice';
import store from '../store';

import { useSelector } from "react-redux";

import { logoutInAction } from "../components/Auth"


export async function action({ request }) {
    const data = Object.fromEntries(await request.formData());

    if (data.password !== data.confirmPassword) {
        // maybe do all validation here and display wrong message using toastify when we get to it
        // for now alert works
        alert("both passwords must be equivilant");
        return false;
    }

    const [res, error] = await patch("/support/changepassword", data);

    if (error) {
        throw error;
    }
    if (res.status == '401') {
        return logoutInAction();
    }

    store.dispatch(addMessage(`Password Change Succesfully`));

    return 1;

}


export default function Profile() {
    const { user } = JSON.parse(localStorage.getItem("user"));
    const isDarkmode = useSelector((state) => state.darkmode.value);
    const className = isDarkmode ? "dark--primary light--gray" : "";
    const textareaClassName = isDarkmode ? "dark--first ligh--gray" : "";
    let keys = [];
    for (let key in user) {
        keys.push(key);
    }
    const info = keys.map((key) => {
        if (key != 'password' && key != '__v' && key != 'updatedAt' && key != "_id" && key != "createdAt") {
            return (
                <div key={key} >
                    <div className="profile--feild">
                        <label className={`profile--label ${className}`} htmlFor={key}>{key}</label>
                        <input className={`faded profile--input ${textareaClassName}`} type="text" name={key} id={key} disabled defaultValue={user[key]} />

                    </div>
                </div>

            );
        };
    });
    return (
        <>
            <Header name="MY PROFILE" allowSearch={false} />

            <div className={`display--elements ${className}`} style={{
                padding: "3rem",
            }}>

                <div className="profile--Info">

                    {info}

                    <Form method="post" className="profile--form">

                        <div className="profile--feild">
                            <label htmlFor="password" className={`profile--label ${className}`}>Password</label>

                            <input type="password" className={`profile--input ${textareaClassName}`} required name="password" id="password" />

                        </div>
                        <div className="profile--feild">
                            <label htmlFor="passwordConfirm" className={`profile--label ${className}`}>Confirm Password </label>

                            <input type="password" className={`profile--input ${textareaClassName}`} required name="confirmPassword" id="passwordConfirm" />

                        </div>



                        <button className="save--button profile--button" type="submit">Save</button>

                    </Form>


                </div>


            </div >
        </>
    );
}