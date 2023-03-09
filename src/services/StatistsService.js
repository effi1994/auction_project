import {sendApiGetRequest, sendApiPostRequest,sendApiPostRequestWithBody} from "./ApiRequests";
import {toast } from 'react-toastify';

import config from "../config.json";
export let urlApi= config.apiUrl;

export let statist={};

export const getStatist= () => {
    sendApiGetRequest(urlApi + "/statist", (response) => {
        if (response.data.success) {
            statist = response.data.statistics;
            console.log(statist);
        }else {
            statist = null;
        }
    })
    return statist;
}

