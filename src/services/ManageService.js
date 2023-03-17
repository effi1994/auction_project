import {sendApiGetRequest, sendApiPostRequest} from "./ApiRequests";
import {Cookies} from 'react-cookie';
import {toast} from 'react-toastify';
import config from "../config.json";
import {errorMessage} from "./ErrorMessageService";

let urlApi = config.apiUrl;


export const getAllUsers = (token, callback) => {
    sendApiPostRequest(urlApi + "/get-all-users", {token}, (response) => {
        if (response.data.success) {
            callback(response.data.users);
        } else {
            let errorCode = response.data.errorCode;
            errorMessage(errorCode);
        }
    })
}

export const getUserDetails = (userId, callback,callback2) => {
    sendApiPostRequest(urlApi + "/get-user-details", {userId:userId}, (response) => {
        if (response.data.success) {
            callback(response.data.userDetailsModel);
            callback2(response.data.userDetailsModel.amount);

        } else {
            let errorCode = response.data.errorCode;
            errorMessage(errorCode);
        }
    })
}

export const updateCreditsUser = (amount, userId, callback) => {
    sendApiPostRequest(urlApi + "/update-credit-amount-user", {amount:amount, userId:userId},
        (response) => {
        if (response.data.success) {
            toast.success("Credits updated successfully", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            callback('../users');
        } else {
            let errorCode = response.data.errorCode;
            errorMessage(errorCode);
        }
    })
}