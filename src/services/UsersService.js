import {sendApiGetRequest, sendApiPostRequest} from "./ApiRequests";
import {Cookies} from 'react-cookie';
import config from "../config.json";
import {errorMessage} from "./ErrorMessageService";

let urlApi = config.apiUrl;
const cookies = new Cookies();

export const getAllUsers = (token, callback) => {
    sendApiPostRequest(urlApi + "/get-all-users", {token}, (response) => {
        if (response.data.success) {
            callback(response.data.allUsers);
        } else {
            let errorCode = response.data.errorCode;
            errorMessage(errorCode);
        }
    })
}

export const getDetailsUser = (userId, callback) => {
    sendApiPostRequest(urlApi + "/get-user-details", {userId}, (response) => {
        if (response.data.success) {
            callback(response.data.user);
        } else {
            let errorCode = response.data.errorCode;
            errorMessage(errorCode);
        }
    })
}

export const updateCreditAmountUser=(amount,userId,callback)=>{
    sendApiPostRequest(urlApi + "/update-credit-amount-user", {amount,userId}, (response) => {
        if (response.data.success) {
            callback();
        } else {
            let errorCode = response.data.errorCode;
            errorMessage(errorCode);
        }
    })
}