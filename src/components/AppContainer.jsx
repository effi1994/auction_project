import React from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import Header from "./Header";
import Login from "../pages/Login";
import {Container} from "@mui/material";
import {useEffect, useState} from "react";
import {getCredits, getToken, user} from "../services/userAtuhService";
import SignUP from "../pages/SignUP";
import {getStatist} from "../services/StatistsService";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeTable from "../pages/HomeTable";
import Product from "../pages/Product";
import MyProducts from "../pages/MyProducts";
import MyBids from "../pages/MyBids";
import UsersSystem from "../pages/UsersSystem";
import UserDetails from "../pages/UserDetails";

const AppContainer = () => {

    let location = useLocation();
    const [token, setToken] = useState(null);
    const [credit, setCredit] = useState(0);
    useEffect( () => {
       // getLiveGames();
        getStatist();
        if (getToken()){
            const interval = setInterval(() => {
                let token = getToken();
                getCredits(token,setCredit);
                //setToken(getToken());
            }, 1000);
            return () => clearInterval(interval);



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
                <Header path={location.pathname} token={token} credit={credit}/>
            }

            <Container>
                <Routes>
                    <Route path={"/"} element={<HomeTable user={user}/>}/>
                    <Route path={"/my-products"} element={<MyProducts/>}/>
                    <Route path={"/my-bids"} element={<MyBids/>}/>
                    <Route path={"/login"} element={<Login token={token} onToken={handleToken}/>}/>
                    <Route path={"/signup"} element={<SignUP token={token} onToken={handleToken}/>}/>
                    <Route path={"/product/:id"} element={<Product/>}/>
                    <Route path={"*"} element={<h1>404 Not Found</h1>}/>
                    <Route path={"/users"} element={<UsersSystem/>}/>
                    <Route path={"/user/:id"} element={<UserDetails/>}/>
                </Routes>
            </Container>
        </>
    );
};

export default AppContainer;