import {sendApiGetRequest} from "./ApiRequests";

import config from "../config.json";
export let urlApi= config.apiUrl;

export let statist={};

export const getStatist= (callback) => {
    sendApiGetRequest(urlApi + "/statist", (response) => {
        if (response.data.success) {
            callback(response.data.statistics);
        }else {
            statist = null;
        }
    })
    return statist;
}

