import {sendApiGetRequest, sendApiPostRequest} from "./ApiRequests";
import {Cookies} from 'react-cookie';
import {toast} from 'react-toastify';
import config from "../config.json";
import {errorMessage} from "./ErrorMessageService";

let urlApi = config.apiUrl;
const cookies = new Cookies();
//get-my-products