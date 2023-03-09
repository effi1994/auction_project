import React from 'react';
import {AppBar, Box, Button, List, Toolbar} from "@mui/material";
import {NavLink, useNavigate,Link} from "react-router-dom";
import {getToken,logout} from "../services/userAtuhService";
import LogoutIcon from '@mui/icons-material/Logout';
import {buttonSX} from "./Styled/ConstantsStyle";

const links = [
    {titlePage: "Live results", path: "/"},
    {titlePage: "League table", path: "/league-table"},
    {titlePage: "League table live", path: "/league-table-live"},
    {titlePage: "Login", path: "/login"},

]

const Header = (props) => {
    links[3].titlePage= props.token  || getToken() ? "Add/Edit games" : "Login";


    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/login");
    }


    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <AppBar position={"static"}>
                    <Toolbar>
                        <List sx={{display: "flex", margin: "0 0 0 0", width: "100%"}}>
                            {links.map(({titlePage, path}) => (
                                <Button  component={NavLink}
                                         to={path}
                                         key={path}
                                         sx={buttonSX}
                                         color={props.path==path ? "warning" : "inherit"}
                                         variant="text"
                                >
                                    {titlePage}
                                </Button>
                            ))}
                            {
                                props.token !=null && getToken() !==undefined   &&
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
                        <span sx={{marginRight:0}}>
                             <Link to={"/login"}>
                                 <img src={"/football_ball_jwo7871eemc0.svg"}
                                      width={25} height={25}
                                 />
                             </Link>

                            </span>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
};

export default Header;