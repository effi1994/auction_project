import {
    Box,
    Button,
    GlobalStyles,
    IconButton,
    InputAdornment,
    TextField, Tooltip,
    Typography
} from "@mui/material";


import {useNavigate} from "react-router-dom";

import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";
import {signUp} from '../services/userAtuhService';
import {globalStyle, boxSX, boxSignUpSX} from "./Styled/ConstantsStyle";
import {errorMessage} from "../services/ErrorMessageService";

const SignUpFrom = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const  [showVerifyPassword, setShowVerifyPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [verifyPassword, setVerifyPassword] = useState('');
    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();

    }
    const handleClickShowVerifyPassword = () => {
        setShowVerifyPassword(!showVerifyPassword);
    }

    const handleMouseDownVerifyPassword = (event) => {
        event.preventDefault();
    }


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handleVerifyPasswordChange = (e) => {
        setVerifyPassword(e.target.value);
    }


    const onSignUp = () => {
        if (!passwordMatch())
            errorMessage(999);
        else
            signUp(username, password, navigate);

    }
    const onBackToLogin = () =>{
        navigate('/login');
    }


    const disabledButton = () => {
        return password == "" || username == "" || verifyPassword == ""
    }

    const passwordMatch = () => {
        return password === verifyPassword;
    }


    return (
        <div
            style={{
                height: "50vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <form>
                <Button
                    variant={"contained"}
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        marginTop: 2
                    }}
                    onClick={onBackToLogin}>
                 Go Back
                </Button>
                <Box display={"flex"}
                     flexDirection={"column"}
                     maxWidth={800}
                     sx={boxSignUpSX}
                >
                    <Typography variant={"h4"}>Sign Up</Typography>
                    <TextField
                        label={"Username"}
                        value={username}
                        onChange={handleUsernameChange}
                        sx={{marginTop: 2}}
                    />
                    <TextField
                        label={"Password"}
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={handlePasswordChange}
                        sx={{marginTop: 2}}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label={"Verify Password"}
                        type={showVerifyPassword ? 'text' : 'password'}
                        value={verifyPassword}
                        onChange={handleVerifyPasswordChange}
                        sx={{marginTop: 2}}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowVerifyPassword}
                                        onMouseDown={handleMouseDownVerifyPassword}
                                        edge="end"
                                    >
                                        {showVerifyPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button
                        variant={"contained"}
                        sx={{marginTop: 2}}
                        onClick={onSignUp}
                        disabled={disabledButton()}
                    >
                        Sign Up
                    </Button>
                </Box>
            </form>
        </div>

    )


}

export default SignUpFrom;
