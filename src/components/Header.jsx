import React from 'react';
import {AppBar, Box, Button, List, Toolbar,Typography } from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import {getCredits, getToken, logout} from "../services/userAtuhService";
import LogoutIcon from '@mui/icons-material/Logout';
import {buttonSX} from "./Styled/ConstantsStyle";
import {useEffect, useState} from "react";
import {Cookies} from "react-cookie";
import config from "../config.json";




const Header = (props) => {
    const [myCredit, setMyCredit] = useState(0);
    const navigate = useNavigate();
    const cookies = new Cookies();

    useEffect(() => {
        let token = cookies.get(config.tokenKey);
        if (token !== undefined) {
            const interval = setInterval(() => {
                getCredits(token, setMyCredit);
            }, 1000);
            return () => clearInterval(interval);
        }

    },[]);


    const handleLogout = () => {
        logout(navigate);
    }

    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <AppBar position={"static"}>
                    <Toolbar>
                        <List sx={{display: "flex", margin: "0 0 0 0", width: "100%"}}>
                            {props.links.map(({titlePage, path}) => (
                                <Button component={NavLink}
                                        to={path}
                                        key={path}
                                        sx={buttonSX}
                                        color={props.path == path ? "warning" : "inherit"}
                                        variant="text"
                                >
                                    {titlePage}
                                </Button>
                            ))}


                            {
                                getToken() !== undefined &&
                                <Button
                                    endIcon={<LogoutIcon/>}
                                    onClick={handleLogout}
                                    sx={buttonSX}
                                    color={"inherit"}
                                    variant="text">
                                    Logout
                                </Button>
                            }

                        </List>

                        <Typography component="span" sx={{flexGrow: 1, textAlign: "right", marginRight: 2, color: "white",verticalAlign:"middle",backgroundColor:"success.light", padding: 1}}>
                                {"Credit:" + myCredit + "$"}
                        </Typography>

                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
};

export default Header;