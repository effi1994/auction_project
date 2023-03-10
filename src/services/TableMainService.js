import {sendApiGetRequest, sendApiPostRequest} from "./ApiRequests";
import config from "../config.json";
import {errorMessage} from "./ErrorMessageService";

let urlApi = config.apiUrl;


export const getTable = (token,callback) => {
    sendApiPostRequest(urlApi + "/get-main-table", {token}, (response) => {
        if (response.data.success) {
            callback(response.data.mainTableModels);
            console.log(response.data.mainTableModels);
        } else {
            let errorCode = response.data.errorCode;
            errorMessage(errorCode);
        }
    })


}