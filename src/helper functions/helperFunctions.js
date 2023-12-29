import SignIn, { instance } from "../views/SignIn";



function checkIfSignedIn() {
    const user = localStorage.getItem("user");
    if (user === null) {
        return null;
    }
    const userobj = JSON.parse(user);
    return userobj;

}

//check status when calling to make sure its not 401  
// [response, Error] each can be null     
export async function post(path, data = null) {

    const user = checkIfSignedIn();

    if (user === null) {
        const response = {
            status: 401,
        };
        return [response, null];
    }

    const axiosClient = instance(user.accessToken);
    try {
        const response = await axiosClient.post(path, data, {
            validateStatus: function (status) {
                if ((status === 401 || status === 200 || status === 404)) return true
                return null
            }
        });
        return [response, null];
    } catch (error) {
        return [null, error];
    }

}

//check status when calling to make sure its not 401  
// [response, error] each can be null   
export async function get(path, data = null) {
    const user = checkIfSignedIn();

    if (user === null) {

        const response = {
            status: 401,
        };
        return [response, null];
    }

    const axiosClient = instance(user.accessToken);
    try {

        const response = await axiosClient.get(path, {
            validateStatus: function (status) {
                if (status === 401 || status === 200) return true;
                return null;
            },
            data: data,

        });
        //check status when calling to make sure its not 401 
        return [response, null];

    } catch (error) {
        console.log(error);
        return [null, error];
    }

}