import {toast} from 'react-toastify';


export const errorMessage = (errorCode) => {
    let message = "";

    switch (errorCode) {
        case 999:
            message = "Password not match";
            break;

        case 1000:
            message = "Missing username";
            break;


        case 1001:
            message = "Missing Password";
            break;
        case 1002:
            message = "Weak Password";
            break;

        case 1003:
            message = "User Name Already Exists";
            break;

        case 1004:
            message = "User Name or Password is incorrect";
            break;

        case 1005:
            message = "No such Token ";
            break;
        case 1007:
            message = "Error Statistics";
            break;
        case 1008:
            message = "No such Product";
            break;
        case 1009:
            message = "Not Enough Credit";
            break;
        case 1010:
            message = "Not Enough Action";
            break;
        case 1011:
            message = "No Credit";
            break;
        case 1012:
            message = "No Product";
            break;
        case 1013:
            message = "Bid Amount to by big from minimum price";
            break;
        case 1014:
            message = "Product not open to action";
            break;
        case 1015:
            message = "User is owner";
            break;
        case 1016:
            message = "No Permission";
            break;
        case 1017:
            message = "No such User";
            break;
        case 1018:
            message = "Minimum 3 Bids";
            break;
        case 1019:
            message = "You Amount is too big from last bid";
            break;

    }



    toast.error(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
    });

};