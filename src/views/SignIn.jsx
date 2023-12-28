import axios from 'axios';
import "../styles/login.css";

import {
    Form, redirect,


} from "react-router-dom"

let baseUrl = 'http://172.27.134.146:3000';



export async function action({ request }) {
    const data = Object.fromEntries(await request.formData());
    try {
        const res = await axios({
            method: 'post',
            url: baseUrl + '/support/signin',
            // validateStatus(status){
            //     if(status)
            // }
            headers: {},
            data: data
        });

        const user = JSON.stringify(res.data);

        localStorage.setItem("user", user);

    } catch (error) {

    }
    return redirect("/");

}

export const instance = (token) => axios.create({
    baseURL: baseUrl,
    headers: { 'Authorization': 'Bearer ' + token }

})

export default function SignIn() {


    return (
        <>
            <div className="big">
            </div>
            <div className='login--image'>
                <div className="form--container">
                    <div className="form--items">
                        <h6>SIGN IN</h6>

                        <Form method='post'>
                            <input
                                id="email"
                                className=""
                                aria-label={`email`}
                                type="email"
                                name="email"
                                placeholder='Email'
                            />
                            <input
                                id="password"
                                className=""
                                aria-label={`password`}
                                type="password"
                                name="password"
                                placeholder='password'
                            />
                            <button type='submit'>aaaa</button>
                        </Form>
                    </div>
                </div>
            </div>

        </>
    );
}