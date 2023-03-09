import React from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import Header from "./Header";
import LiveResults from "../pages/LiveResults";
import LeagueTable from "../pages/LeagueTable";
import LeagueTableLive from "../pages/LeagueTableLive";
import Login from "../pages/Login";
import {Container} from "@mui/material";
import {useEffect, useState} from "react";
import {getToken} from "../services/userAtuhService";
import {getTeams} from "../services/teamService";
import {getLiveGames} from "../services/gameService";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppContainer = () => {

    let location = useLocation();
    const [token, setToken] = useState(null);
    useEffect( () => {
        getLiveGames();
        if (getToken()){

            setToken(getToken());

        }else {
            setToken(null);
        }
        getTeams();


    })

    const handleToken = (token) => {
        setToken(token);
    }
    return (
        <>
            <ToastContainer/>
            {
                token && getToken() &&
                <Header path={location.pathname} token={token}/>
            }

            <Container>
                <Routes>
                    <Route path={"/"} element={<LiveResults/>}/>
                    <Route path={"/league-table"} element={<LeagueTable/>}/>
                    <Route path={"/league-table-live"} element={<LeagueTableLive/>}/>
                    <Route path={"/login"} element={<Login token={token} onToken={handleToken}/>}/>
                </Routes>
            </Container>
        </>
    );
};

export default AppContainer;