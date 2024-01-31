import { instance } from "../views/SignIn";

// refracter those because u dont need to check if its autherized or no any more or if user logged in or no

function checkIfSignedIn() {
    const user = localStorage.getItem("user");
    if (user === null) {
        return null;
    }
    const userobj = JSON.parse(user);
    return userobj;

}

//check status when calling to make sure its not 401  

// calls post from axios takes data and sends it throw the body
// returns [response,null] each can be null
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
                if ((status === 401 || status === 200 || status === 201 || status === 404)) return true
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
// calls get from axios takes path and data and appends them together 
// returns [response,null] each can be null

export async function get(path, data = "") {
    const user = checkIfSignedIn();

    if (user === null) {

        const response = {
            status: 401,
        };
        return [response, null];
    }

    const axiosClient = instance(user.accessToken);
    try {

        const response = await axiosClient.get(path + data, {
            validateStatus: function (status) {
                if (status === 401 || status === 200 || status === 404) return true;
                return null;
            },

        });
        //check status when calling to make sure its not 401 
        return [response, null];

    } catch (error) {
        return [null, error];
    }

}

export async function put(path, data) {

    const user = checkIfSignedIn();

    if (user === null) {

        const response = {
            status: 401,
        };
        return [response, null];
    }

    const axiosClient = instance(user.accessToken);
    try {

        const response = await axiosClient.put(path, data, {
            validateStatus: function (status) {
                if (status === 401 || status === 200 || status === 201 || status === 404) return true;
                return null

            }
        })
        //check status when calling to make sure its not 401 
        return [response, null];

    } catch (error) {
        return [null, error];
    }

}

export async function deletereq(path, data) {
    const user = checkIfSignedIn();

    if (user === null) {

        const response = {
            status: 401,
        };
        return [response, null];
    }

    const axiosClient = instance(user.accessToken);

    try {

        const response = await axiosClient.delete(path, data, {
            validateStatus: function (status) {
                if (status === 401 || status === 200 || status === 201 || status === 404) return true;
                return null

            }
        });
        //check status when calling to make sure its not 401 
        return [response, null];

    } catch (error) {
        return [null, error];
    }
}

export async function patch(path, data) {
    // may refactor these to handle auth logic in a ceperate component and check every time he moves for token too
    const user = checkIfSignedIn();

    if (user === null) {

        const response = {
            status: 401,
        };
        return [response, null];
    }

    const axiosClient = instance(user.accessToken);

    try {


        const response = await axiosClient.patch(path, data, {
            validateStatus: function (status) {
                if (status === 401 || status === 200 || status === 201 || status === 404) return true;
                return null

            }
        });
        //check status when calling to make sure its not 401 
        return [response, null];

    } catch (error) {
        return [null, error];
    }
}