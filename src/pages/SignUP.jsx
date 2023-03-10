
import SignUpFrom from "../components/SignUpFrom";
import {Cookies} from 'react-cookie';
import {useNavigate} from "react-router-dom";
import  config  from "../config.json";
import {useEffect} from "react";


const SignUP = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    useEffect(() => {
        const token = cookies.get(config.tokenKey);
        if (token){
            navigate('/');
        }else {

        }
    },)




    return (
        <div>
            <SignUpFrom/>
        </div>
    )

}

export default SignUP