import React from 'react';
import LoginForm from "../components/LoginForm";
import AddEditGamesPage from "./AddEditGamesPage";
import {getToken} from "../services/userAtuhService";
import {getStatist,urlApi} from "../services/StatistsService";
import {useState,useEffect} from "react";
import {Cookies} from 'react-cookie';
import {useNavigate} from "react-router-dom";
import  config  from "../config.json";
//import './css/statistics.css';

const Login = (props) => {
    const [statists, setStatist] = useState({})
    const navigate = useNavigate();




    useEffect(() => {
      const cookies = new Cookies();
      const token = cookies.get(config.tokenKey);
        if (token){
            navigate('/');

        }else {
            getStatist(setStatist)

        }



    },[])

    useEffect(() => {
        const eventSource = new EventSource(urlApi+"/sse-statist");
        eventSource.onmessage = event => {
            const newStats = JSON.parse(event.data);
            setStatist(newStats.statistics);
        };
        return () => {
            eventSource.close();
        };
    }, [])



    return (



        <div>

                 <LoginForm onToken={props.onToken}/>
            <form>
                <h1>System Statistics</h1>
                <p>
                    <label>Number of users:</label>
                    <span>{statists.numUsers}</span>
                </p>
                <p>
                    <label>Number of open tenders:</label>
                    <span>{statists.numOpenTenders}</span>
                </p>
                <p>
                    <label>Number of closed tenders:</label>
                    <span>{statists.numClosedTenders}</span>
                </p>
                <p>
                    <label>Number of open bids:</label>
                    <span>{statists.numOpenBids}</span>
                </p>
                <p>
                    <label>Number of closed bids:</label>
                    <span>{statists.numClosedBids}</span>
                </p>
            </form>



        </div>
    );
};

export default Login;