import {
    Box,
    Button,
    GlobalStyles,
    IconButton,
    InputAdornment,
    TextField, Tooltip,
    Typography
} from "@mui/material";

import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";
import {login} from '../services/userAtuhService';
import {globalStyle, boxSX} from "./Styled/ConstantsStyle"
import {useNavigate} from "react-router-dom";


const LoginForm = (props) => {


    const disabledButton = () => {
        return password == "" || username == ""
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const onLogin = () => {
        login(username, password,navigate);
    }

    const signUp = () => {
        navigate("/signup");
    }


    return (
        <div>
            <form>
                <Box display={"flex"}
                     flexDirection={"column"}
                     maxWidth={400}
                     alignItems={"center"}
                     justifyContent={"center"}
                     margin={"auto"}
                     marginTop={5}
                     padding={3}
                     borderRadius={3}
                     boxShadow={'5px 5px 10px #ccc'}
                     sx={boxSX}


                >
                    <Typography variant={"h4"} padding={3} textAlign={"center"}>Login</Typography>

                    <TextField sx={{width: "70%"}}
                               label="Username"
                               margin={"normal"}
                               type={"text"}
                               variant={"outlined"}
                               value={username}
                               onChange={handleUsernameChange}

                    />


                    <GlobalStyles styles={globalStyle}/>

                    <TextField
                        label='Password'
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        margin={"normal"}
                        sx={{width: "70%"}}
                        value={password}
                        onChange={handlePasswordChange}

                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    <Tooltip title={!disabledButton() ? "" : "You need to enter both username and password"}>
                        <span>
                            <Button sx={{
                                marginTop: 3,
                                borderRadius: 3,
                                transition: "0.3s ease-in",
                                ":hover": {
                                    size: "large"
                                }
                            }}
                                    disabled={disabledButton()}
                                    variant={"contained"}
                                    color={"warning"}
                                    onClick={onLogin}
                            >
                                    Login
                            </Button>
                        </span>
                    </Tooltip>

                    <Button sx={{
                        marginTop: 3,
                        borderRadius: 3,
                        transition: "0.3s ease-in",
                        ":hover": {
                            size: "large"

                        }
                    }}
                            variant={"contained"}
                            color={"warning"}
                            onClick={signUp}
                    >
                        Sign Up
                    </Button>


                        </Box>
                        </form>
                        </div>
                        );
                    };

                    export default LoginForm;