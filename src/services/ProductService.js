import {sendApiGetRequest, sendApiPostRequest} from "./ApiRequests";
import {Cookies} from 'react-cookie';
import {toast} from 'react-toastify';
import config from "../config.json";
import {errorMessage} from "./ErrorMessageService";

let urlApi = config.apiUrl;
const cookies = new Cookies();
//get-my-products

export const getMyProducts = (token, callback) => {
    sendApiPostRequest(urlApi + "/get-my-products", {token}, (response) => {
        if (response.data.success) {
            callback(response.data.myProducts);
            console.log(response.data.myProducts)
        } else {
            let errorCode = response.data.errorCode;
            errorMessage(errorCode);
        }
    })
}

export const getProduct = (token, productId, callback,callback2) => {
    sendApiPostRequest(urlApi + "/get-product", {token, productId}, (response) => {
        if (response.data.success) {
            console.log(response.data.product)

            callback(response.data.product);
            callback2(response.data.product.myBids);
        } else {
            let errorCode = response.data.errorCode;
            errorMessage(errorCode);
        }
    })
}

export const addProduct = (token, name, description, imageLink, minPrice,callback,callback2) => {
    let openToAction =true;
    sendApiPostRequest(urlApi + "/add-product",
        {token,
            productName:name,
            content:description,
            imageLink:imageLink,
            minimumPrice:minPrice,
            openToAction}, (response) => {
        if (response.data.success) {
            toast.success("Product added successfully");
            callback();
            //callback2("/");
        } else {
            let errorCode = response.data.errorCode;
            errorMessage(errorCode);
        }
    })
}

export const closeProduct = (token, id, callback) => {

    sendApiPostRequest(urlApi + "/closed-action", {token, productId:id}, (response) => {
        if (response.data.success) {

            toast.success("Product closed successfully");
            callback("/");
        } else {
            let errorCode = response.data.errorCode;
            errorMessage(errorCode);
        }
    })
}