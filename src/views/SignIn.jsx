import axios from 'axios';
import "../styles/login.css";
import loginImage from "../assets/signImage.png"

let baseUrl = 'http://172.27.134.146:3000'

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
                test
            </div>

        </>
    );
}