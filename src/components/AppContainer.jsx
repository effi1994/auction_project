import React from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import Header from "./Header";
import LiveResults from "../pages/LiveResults";
import LeagueTable from "../pages/LeagueTable";
import LeagueTableLive from "../pages/LeagueTableLive";
import Login from "../pages/Login";
import {Container} from "@mui/material";
import {useEffect, useState} from "react";
import {getToken,getUser} from "../services/userAtuhService";
import SignUP from "../pages/SignUP";
import {getStatist} from "../services/StatistsService";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeTable from "../pages/HomeTable";
import Product from "../pages/Product";
import {getTeams} from "../services/teamService";
import {getEndGames} from "../services/gameService";
import {calculateTableLeague, tableLeagueEnd} from "../services/CalculationTableService";

const AppContainer = () => {

    let location = useLocation();
    const [token, setToken] = useState(null);
    const [credit, setCredit] = useState(0);
    useEffect( () => {
       // getLiveGames();
        getStatist();
        if (getToken()){



        }else {
            setToken(null);
        }
        //getTeams();


    },[])

    const handleToken = (token) => {
        setToken(token);
    }
    return (
        <>
            <ToastContainer/>
            {
                getToken() &&
                <Header path={location.pathname} token={token}/>
            }

            <Container>
                <Routes>
                    <Route path={"/"} element={<HomeTable user={user}/>}/>
                    <Route path={"/league-table"} element={<LeagueTable/>}/>
                    <Route path={"/league-table-live"} element={<LeagueTableLive/>}/>
                    <Route path={"/login"} element={<Login token={token} onToken={handleToken}/>}/>
                    <Route path={"/signup"} element={<SignUP token={token} onToken={handleToken}/>}/>
                    <Route path={"/products/:id"} element={<Product/>}/>
                </Routes>
            </Container>
        </>
    );
};

export default AppContainer;