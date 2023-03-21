import React from 'react';
import LoginForm from "../components/LoginForm";
import {getStatist,urlApi} from "../services/StatistsService";
import {useState,useEffect} from "react";
import {Cookies} from 'react-cookie';
import {useNavigate} from "react-router-dom";
import  config  from "../config.json";


const Login = (props) => {
    const [statists, setStatist] = useState({})
    const navigate = useNavigate();



    useEffect(() => {
      const cookies = new Cookies();
      const token = cookies.get(config.tokenKey);
        if (token){
            navigate('/');

        }else {
            const interval = setInterval(() => {
                getStatist(setStatist)
            }, 1000);
            return () => clearInterval(interval);
        }



    },[])


    return (



        <div>

                 <LoginForm onToken={props.onToken} statists={statists}/>


        </div>
    );
};

export default Login;