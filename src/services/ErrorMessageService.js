import {toast } from 'react-toastify';



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
            message ="Missing Password";
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

    }


    toast.error(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
    });

};