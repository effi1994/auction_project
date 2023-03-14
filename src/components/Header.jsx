import React from 'react';
import {AppBar, Box, Button, List, Toolbar,Typography } from "@mui/material";
import {NavLink, useNavigate, Link} from "react-router-dom";
import {getToken, logout} from "../services/userAtuhService";
import LogoutIcon from '@mui/icons-material/Logout';
import {buttonSX} from "./Styled/ConstantsStyle";
import config from "../config.json";
import {Cookies} from "react-cookie";

const links = [
    {titlePage: "Home", path: "/"},
    {titlePage: "My Products", path: "/my-products"},
    {titlePage: "My Bids", path: "/my-bids"},

]

const Header = (props) => {
    //links[3].titlePage=  getToken() ? "Add/Edit games" : "Login";
    const credit = props.credit;
    const  cookies = new Cookies();





    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    const changeTitle = () => {
        const  cookies = new Cookies();
        const  admin = cookies.get(config.tokenKeyAdmin);
        let arrayLinks = [];

        if (admin === 'true'){
            for (let i = 0; i < 1; i++) {
                arrayLinks.push(links[i]);
            }

            arrayLinks[1]={titlePage: "Users", path: "/users"};
        }else {
            for (let i = 0; i < 3; i++) {
                arrayLinks.push(links[i]);
            }
        }

        return arrayLinks;
    }


    const filteredLinks = changeTitle();

    return (
        console.log("filteredLinks",filteredLinks),
        <>
            <Box sx={{flexGrow: 1}}>
                <AppBar position={"static"}>
                    <Toolbar>
                        <List sx={{display: "flex", margin: "0 0 0 0", width: "100%"}}>
                            {filteredLinks.map(({titlePage, path}) => (
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
                                {"Credit:" + credit + "$"}
                        </Typography>

                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
};

export default Header;