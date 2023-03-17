import React from 'react';
import {AppBar, Box, Button, List, Toolbar,Typography } from "@mui/material";
import {NavLink, useNavigate, Link,useLocation} from "react-router-dom";
import {getToken, logout} from "../services/userAtuhService";
import LogoutIcon from '@mui/icons-material/Logout';
import {buttonSX} from "./Styled/ConstantsStyle";



const Header = (props) => {
    const credit = props.credit;
    const location = useLocation();





    const navigate = useNavigate();
    const handleLogout = () => {
        logout(navigate);
        window.location.reload();

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
                                {"Credit:" + credit + "$"}
                        </Typography>

                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
};

export default Header;