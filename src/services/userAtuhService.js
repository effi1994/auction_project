import {sendApiGetRequest, sendApiPostRequest} from "./ApiRequests";
import {Cookies} from 'react-cookie';
import {toast} from 'react-toastify';
import config from "../config.json";
import {errorMessage} from "./ErrorMessageService";

let urlApi = config.apiUrl;
 export let user = null;
const cookies = new Cookies();



export const login = (username, password, callback) => {
    sendApiPostRequest(urlApi + "/login", {
        username,
        password
    }, (response) => {
        if (response.data.success) {
            //user = response.data.userObject;
            toast.success("login successfully");
            callback("/");

            cookies.set(config.tokenKey, response.data.token, {path: '/', expires: new Date(Date.now() + 1000 * 60 * 60 * 24)});
            //callback(user.token);
        } else {
            let errorCode = response.data.errorCode;
            errorMessage(errorCode);
        }
    })
}

export const getToken = () => {
    return cookies.get(config.tokenKey);
}

export const logout = () => {
    cookies.remove(config.tokenKey);
    cookies.remove(config.tokenKeyAdmin);
    user = null;
}



export const getUser = (token,callback) => {
    sendApiPostRequest(urlApi + "/get-user", {token}, (response) => {
        if (response.data.success) {
            user=response.data.user;
            cookies.set(config.tokenKeyAdmin, response.data.user.admin, {path: '/', expires: new Date(Date.now() + 1000 * 60 * 60 * 24)});
            callback(user);
        } else {
            let errorCode = response.data.errorCode;
            errorMessage(errorCode);
        }
    })
}

export const signUp = (username, password, callback) => {
    sendApiPostRequest(urlApi + "/sign-up", {
        username,
        password
    }, (response) => {
        if (response.data.success) {

            toast.success("Sign up successfully");

            callback("/login");


        } else {
            let errorCode = response.data.errorCode;
            errorMessage(errorCode);

        }
    })
};

export const getCredits = (token,callback) => {

    if (token === undefined) {
        return;
    }

    sendApiPostRequest(urlApi + "/get-credit", {token}, (response) => {
        if (response.data.success) {
            callback(response.data.creditManagement.creditAmount);
        } else {
            let errorCode = response.data.errorCode;
            errorMessage(errorCode);
        }
    })
}