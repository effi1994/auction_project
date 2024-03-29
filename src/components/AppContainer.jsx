import React from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import Header from "./Header";
import Login from "../pages/Login";
import {Container} from "@mui/material";
import {getToken, user} from "../services/userAtuhService";
import SignUP from "../pages/SignUP";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeTable from "../pages/HomeTable";
import Product from "../pages/Product";
import MyProducts from "../pages/MyProducts";
import MyBids from "../pages/MyBids";
import UsersSystem from "../pages/UsersSystem";
import UserDetails from "../pages/UserDetails";
import {Cookies} from "react-cookie";
import config from "../config.json";

const linksUser = [
    {titlePage: "Home", path: "/"},
    {titlePage: "My Products", path: "/my-products"},
    {titlePage: "My Bids", path: "/my-bids"},
]

const linksAdmin = [
    {titlePage: "Home", path: "/"},
    {titlePage: "Users", path: "/users"},
];

const AppContainer = () => {
    let location = useLocation();
    const cookies = new Cookies();
    const [token, setToken] = React.useState(cookies.get(config.tokenKey));


    const handleToken = (token) => {
        setToken(token);
    }


    return (
        <>
            <ToastContainer/>
            {
                getToken() &&
                <Header path={location.pathname}
                        links={
                            cookies.get(config.tokenKeyAdmin) === 'true' ? linksAdmin : linksUser
                        }/>
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