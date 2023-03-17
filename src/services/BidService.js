import {sendApiGetRequest, sendApiPostRequest} from "./ApiRequests";
import {Cookies} from 'react-cookie';
import {toast} from 'react-toastify';
import config from "../config.json";
import {errorMessage} from "./ErrorMessageService";

let urlApi = config.apiUrl;
const cookies = new Cookies();

export  const addBid = (token, productId, bidAmount, callback) => {
    sendApiPostRequest(urlApi + "/add-bid", {token, productId, bidAmount}, (response) => {
        if (response.data.success) {
            toast.success("Bid added successfully", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            callback(
                (prevMyBids) => {
                    const newMyBids = prevMyBids.slice();
                    let newBid = {id:response.data.id,userBid:response.data.userBid};
                    newMyBids.push(newBid);
                    return newMyBids;
                }
            );
        } else {
            let errorCode = response.data.errorCode;
            errorMessage(errorCode);
        }
    })
}

export const getMyBids = (token, callback) => {
    sendApiPostRequest(urlApi + "/get-my-bids", {token}, (response) => {
        if (response.data.success) {
            callback(response.data.myBids);
        } else {
            let errorCode = response.data.errorCode;
            errorMessage(errorCode);
        }
    })
}