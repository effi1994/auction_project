import React from 'react';
import LoginForm from "../components/LoginForm";
import AddEditGamesPage from "./AddEditGamesPage";
import {getToken} from "../services/userAtuhService";
import {getStatist,statist,urlApi} from "../services/StatistsService";
import {useState,useEffect} from "react";

const Login = (props) => {
    const [statists, setStatist] = useState({})

    useEffect(() => {
        getStatist()
    },[])

    useEffect(() => {
        setStatist(statist)
    },[statist])

    useEffect(() => {
        const eventSource = new EventSource(urlApi+"/sse-statist");
        eventSource.onmessage = event => {
            console.log(event.data)
            const newStats = JSON.parse(event.data);
            setStatist(newStats.statistics);
            console.log(newStats)
        };
        return () => {
            eventSource.close();
        };
    }, [])



    return (
        <div>
            {
                props.token || getToken() ? <AddEditGamesPage/> : <LoginForm onToken={props.onToken}/>
            }

            <div>
                <h1>LOGIN</h1>
                <p>Number of users:{statists.numUsers} </p>
                <p>Number of open tenders:{statists.numOpenTenders} </p>
                <p>Number of closed tenders:{statists.numClosedTenders} </p>
                <p>Number of open bids:{statists.numOpenBids} </p>
                <p>Number of closed bids:{statists.numClosedBids} </p>
            </div>


        </div>
    );
};

export default Login;